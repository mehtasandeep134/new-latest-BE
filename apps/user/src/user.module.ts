import { Module } from '@nestjs/common';
import { ModuleModule } from 'apps/module/src/module.module';
import { ModuleService } from 'apps/module/src/module.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ModuleModule,
    PrismaModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        service: 'gmail',
        port: 587,
        ignoreTLS: false,
        auth: {
          user: process.env.SENDERMAIL,
          pass: process.env.MAILPASS,
        },
      },
      defaults: {
        from: process.env.SENDERMAIL,
        subject: 'Password Reset',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ModuleService],
  exports: [ModuleService],
})
export class UserModule {}
