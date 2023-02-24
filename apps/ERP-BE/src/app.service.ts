import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from 'apps/shared/dto/create-user.dto';
import { CreateCompanyRequest } from 'apps/shared/dto/created-company.dto';
import { CompanyCreatedEvent } from 'apps/shared/events/company.event';
import { UserCreatedEvent } from 'apps/shared/events/user.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('COMMUNICATION')
    private readonly communicationClient: ClientProxy,
    @Inject('COMPANY')
    private readonly companyClient: ClientProxy,
    @Inject('USER')
    private readonly userClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(
    createUserRequest: CreateUserRequest,
  ) {
    // emit event to keep communication logs
    this.communicationClient.emit(
      'user_created',
      new UserCreatedEvent(
        createUserRequest.email,
        createUserRequest.password,
        createUserRequest.company_name,
      ),
    );

    // emit event to interact with user repo
    this.userClient.emit(
      'user_created',
      new UserCreatedEvent(
        createUserRequest.email,
        createUserRequest.password,
        createUserRequest.company_name,
      ),
    );
  }

  createCompany(
    createCompanyRequest: CreateCompanyRequest,
  ) {
    // emit event to keep communication logs
    this.communicationClient.emit(
      'company_created',
      new CompanyCreatedEvent(
        createCompanyRequest.email,
        createCompanyRequest.password,
      ),
    );

    // emit event to interact with company repo
    this.companyClient.emit(
      'company_created',
      new CompanyCreatedEvent(
        createCompanyRequest.email,
        createCompanyRequest.password,
      ),
    );
  }

  getCompany() {
    // send event to interact with company repo
    return this.companyClient.send(
      { cmd: 'get_company' },
      {},
    );
  }

  getUser() {
    // send event to interact with user repo
    return this.userClient.send(
      { cmd: 'get_user' },
      {},
    );
  }
}
