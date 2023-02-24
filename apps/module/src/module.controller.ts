import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { CreateModuleDto } from './dto/module.dto';
import { ModuleService } from './module.service';

@Controller()
export class ModuleController {
  constructor(
    private readonly moduleService: ModuleService,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello';
  }

  @Get('get_module')
  @ApiProperty()
  getModules() {
    return this.moduleService.getModules();
  }

  @Post('add_module')
  @ApiProperty()
  addModule(@Body() data: CreateModuleDto) {
    return this.moduleService.handleModuleCreated(
      data,
    );
  }
}
