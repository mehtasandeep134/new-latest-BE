import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'apps/user/src/prisma/prisma.service';
import {
  AuthDto,
  AuthSignInDto,
  PasswordDto,
  ResetPassDto,
} from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '5d',
        secret: secret,
      },
    );

    return { token };
  }

  async signup(dto: AuthDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(
        dto.password,
        salt,
      );

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
          company_name: dto.company_name,
        },
      });

      return user;
    } catch (error) {
      if (PrismaClientKnownRequestError) {
        if ((error.code = 'P2002')) {
          throw new ForbiddenException(
            'Email already exists',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthSignInDto) {
    try {
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });

      if (!user)
        throw new ForbiddenException(
          'User does not exist',
        );

      const passMatch = await bcrypt.compare(
        dto.password,
        user.password,
      );

      if (!passMatch)
        throw new ForbiddenException(
          'Password is incorrect',
        );

      delete user.password;
      return {
        jwt: (
          await this.signToken(
            user.id,
            user.email,
          )
        ).token,
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(dto: PasswordDto) {
    try {
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });

      if (!user)
        throw new ForbiddenException(
          'Email does not exist',
        );

      const token = randomInt(
        111111,
        999999,
      ).toString();

      await this.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          passwordResetToken: token,
          passwordResetAt: new Date(),
        },
      });

      const link = 'https://randomlink.com';

      this.mailerService.sendMail({
        to: user.email,
        html: `<p>We heard that you lost your password. Sorry about that!</p><p>But don’t worry! You can use the following OTP to reset your password:</p><p>OTP : ${token}</p><p>URL : ${link}</p>`,
      });

      return 'Password reset link sent to your email';
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(dto: ResetPassDto) {
    try {
      const user =
        await this.prisma.user.findFirst({
          where: {
            AND: [
              {
                email: dto.email,
              },
              {
                passwordResetToken: dto.token,
              },
            ],
          },
        });

      if (!user)
        throw new ForbiddenException(
          'Incorrect or invalid code provided',
        );

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(
        dto.password,
        salt,
      );

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          passwordResetToken: null,
          password: password,
        },
      });

      return 'Password changed successfully!';
    } catch (error) {
      throw error;
    }
  }
}
