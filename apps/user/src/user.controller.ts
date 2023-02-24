import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { JwtGuard } from './auth/guard';
import { UserCreatedDto } from './dto/userCreated.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @UseGuards(JwtGuard)
  @Get('get_user')
  getUserApi() {
    return this.userService.getUser();
  }

  @Patch('handle_user')
  async handleUserCreatedApi(
    @Body() data: UserCreatedDto,
  ) {
    return await this.userService.handleUserCreated(
      data,
    );
  }

  @EventPattern('user_created')
  handleUserCreated(data: UserCreatedDto) {
    this.userService.handleUserCreated(data);
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser() {
    return this.userService.getUser();
  }
}
