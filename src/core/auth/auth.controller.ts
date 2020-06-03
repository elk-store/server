import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { LoginPayload, JwtResponse } from './auth.interface';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Authenticate an user' })
  @ApiResponse({
    status: 200,
    type: JwtResponse,
  })
  @Post()
  public login(@Body() payload: LoginPayload): Promise<JwtResponse> {
    return this.authService.login(payload);
  }
}
