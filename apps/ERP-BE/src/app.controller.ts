import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserRequest } from 'apps/shared/dto/create-user.dto';
import { CreateCompanyRequest } from 'apps/shared/dto/created-company.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('user')
  createUser(@Body() createUserRequest: CreateUserRequest) {
    this.appService.createUser(createUserRequest);
  }

  @Post('company')
  createCompany(@Body() createCompanyRequest: CreateCompanyRequest) {
    this.appService.createCompany(createCompanyRequest);
  }

  @Get('company_created')
  getCompany() {
    return this.appService.getCompany();
  }

  @Get('user_created')
  getUser() {
    return this.appService.getUser();
  }
}
