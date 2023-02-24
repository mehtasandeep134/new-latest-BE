import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices/decorators';
import { CompanyCreatedEvent } from 'apps/shared/events/company.event';
import { UserCreatedEvent } from 'apps/shared/events/user.event';
import { CommunicationService } from './communication.service';

@Controller()
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Get()
  getHello(): string {
    return this.communicationService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreated(data: UserCreatedEvent) {
    this.communicationService.handleUserCreated(data);
  }

  @EventPattern('company_created')
  handleCompanyCreated(data: CompanyCreatedEvent) {
    this.communicationService.handleCompanyCreated(data);
  }
}
