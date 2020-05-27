import { Controller, Post, Body } from '@nestjs/common';

import { LoginPayload } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  public login(@Body() payload: LoginPayload) {
    return this.authService.login(payload);
  }
}
