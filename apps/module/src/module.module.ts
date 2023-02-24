import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { PrismaService } from 'apps/user/src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ModuleController],
  providers: [
    ModuleService,
    PrismaService,
    ConfigService,
  ],
  exports: [ModuleService, PrismaService],
})
export class ModuleModule {}
