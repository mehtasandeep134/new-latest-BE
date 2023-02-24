export class UserCreatedEvent {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly company_name: string,
  ) {}
}
