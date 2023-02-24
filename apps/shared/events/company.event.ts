export class CompanyCreatedEvent {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
