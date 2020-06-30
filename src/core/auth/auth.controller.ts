import { Controller, Post, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import {
  LoginPayload,
  JwtResponse,
  RecoverySentPayload,
  RecoveryPayload,
} from './auth.interface';
import { AuthService } from './auth.service';

@ApiTags('Auth')
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

  @ApiOperation({ summary: 'Send a recovery email to an user' })
  @ApiBody({
    description: 'The RecoverySentPayload object',
    type: RecoverySentPayload,
  })
  @Post('/recovery')
  public sentRecoveryEmail(@Body() { email }: RecoverySentPayload) {
    return this.authService.sendRecoveryPasswordEmail(email);
  }

  @ApiOperation({ summary: 'Verify code and change user password' })
  @ApiParam({
    name: 'code',
    description: 'The recovery code that was sent by email',
    required: true,
  })
  @ApiBody({
    description: 'The RecoveryPayload object',
    type: RecoveryPayload,
  })
  @Post('/recovery/:code')
  public verifyRecoveryCodeAndChangePassword(
    @Param('code') code: string,
    @Body() { password }: RecoveryPayload
  ) {
    return this.authService.verifyCodeAndChangePassword(code, password);
  }
}
