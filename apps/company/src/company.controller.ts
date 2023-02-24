import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CompanyCreatedEvent } from 'apps/shared/events/company.event';
import { CompanyService } from './company.service';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getHello(): string {
    return this.companyService.getHello();
  }
  @EventPattern('company_created')
  handleCompanyCreated(data: CompanyCreatedEvent) {
    this.companyService.handleCompanyCreated(data);
  }

  @MessagePattern({ cmd: 'get_company' })
  getCompany() {
    return this.companyService.getCompany();
  }
}
