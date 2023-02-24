import { Injectable } from '@nestjs/common';
import { CompanyCreatedEvent } from 'apps/shared/events/company.event';
import { UserCreatedEvent } from 'apps/shared/events/user.event';

@Injectable()
export class CommunicationService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: UserCreatedEvent) {
    console.log('handle User created - COMMUNICATION', data);
  }

  handleCompanyCreated(data: CompanyCreatedEvent) {
    console.log('handle Company created - COMMUNICATION', data);
  }
}
