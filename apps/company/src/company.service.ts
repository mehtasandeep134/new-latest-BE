import { Injectable } from '@nestjs/common';
import { CompanyCreatedEvent } from 'apps/shared/events/company.event';

@Injectable()
export class CompanyService {
  private readonly company: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  handleCompanyCreated(data: CompanyCreatedEvent) {
    console.log('company creation handling', data);
    this.company.push({
      email: data.email,
      timestamp: Date.now(),
    });
  }

  getCompany() {
    return this.company;
  }
}
