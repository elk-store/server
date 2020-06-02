import {
  Post,
  Body,
  Controller,
  UseGuards,
  Get,
  Session,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtPayload } from '../../core/auth/auth.interface';
import { RequiredRoles } from '../../core/auth/required-roles.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';
import { UserDTO } from './user.dto';
import { UserRole } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public signUp(@Body() payload: UserDTO) {
    return this.userService.signUp(payload);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  public me(@Session() user: JwtPayload) {
    return this.userService.findByEmail(user.email);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Get()
  public getUsers() {
    return this.userService.findAll();
  }
}
