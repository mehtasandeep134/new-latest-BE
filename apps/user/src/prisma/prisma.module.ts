import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, ConfigService],
  exports: [PrismaService, ConfigService],
})
export class PrismaModule {}
