import {
  Body,
  Controller,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthDto,
  AuthSignInDto,
  PasswordDto,
  ResetPassDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthSignInDto) {
    return this.authService.signin(dto);
  }

  @Patch('forgot-password')
  forgotPassword(@Body() dto: PasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Patch('reset-password')
  resetPassword(@Body() dto: ResetPassDto) {
    return this.authService.resetPassword(dto);
  }
}
