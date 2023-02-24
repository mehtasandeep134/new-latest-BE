import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/user/src/prisma/prisma.service';
import { CreateModuleDto } from './dto/module.dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async handleModuleCreated(
    data: CreateModuleDto,
  ) {
    console.log('module creation handling', data);
    const newModule =
      await this.prisma.module.create({
        data: {
          name: data.name,
          controls: data.controls,
          userId: data.userId,
        },
        include: {
          user: true,
        },
      });
    return newModule;
  }

  async getModules() {
    return this.prisma.module.findMany({
      include: {
        user: true,
      },
    });
  }
}
