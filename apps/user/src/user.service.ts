import { Injectable } from '@nestjs/common';
import { UserCreatedDto } from './dto/userCreated.dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleUserCreated(data: UserCreatedDto) {
    try {
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

      if (
        data.role ||
        data?.sub_companies.length > 0
      )
        await this.prisma.user.update({
          where: {
            email: data.email,
          },
          data: {
            role: data.role,
            sub_companies: data.sub_companies,
          },
        });

      if (
        data.sub_companies &&
        data.sub_companies.length > 0
      )
        await this.prisma.user.update({
          where: {
            email: data.email,
          },
          data: {
            sub_companies: data.sub_companies,
          },
        });

      const moduleData =
        await this.prisma.module.findMany({
          where: { userId: user.id },
        });

      for (const {
        name,
        controls,
      } of data?.moduleAccess) {
        moduleData.some(
          (item2) => item2.name === name,
        )
          ? await this.prisma.module.updateMany({
              where: {
                userId: user.id,
                name,
              },
              data: {
                name,
                controls,
                userId: user.id,
              },
            })
          : await this.prisma.module.createMany({
              data: {
                name,
                controls,
                userId: user.id,
              },
            });
      }

      const updatedUser =
        await this.prisma.user.findUnique({
          where: {
            email: data.email,
          },
          include: {
            modules: true,
          },
        });
      return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  async getUser() {
    return await this.prisma.user.findMany();
  }
}
