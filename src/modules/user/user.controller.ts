import {
  Post,
  Body,
  Controller,
  UseGuards,
  Get,
  Session,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { JwtPayload } from '../../core/auth/auth.interface';
import { RequiredRoles } from '../../core/auth/required-roles.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';
import { UserCreateDTO } from './dtos/user-create.dto';
import { UserResponseDTO } from './dtos/user-response.dto';
import { UserRole } from './user.interface';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Sign up an user' })
  @ApiResponse({
    status: 201,
    type: UserResponseDTO,
  })
  @Post()
  public async signUp(
    @Body() payload: UserCreateDTO
  ): Promise<UserResponseDTO> {
    const entity = await this.userService.signUp(payload);
    return plainToClass(UserResponseDTO, entity);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get informations of an user' })
  @ApiResponse({
    status: 200,
    type: UserResponseDTO,
  })
  @UseGuards(AuthGuard())
  @Get('me')
  public async me(@Session() user: JwtPayload): Promise<UserResponseDTO> {
    const entity = await this.userService.findByEmail(user.email);
    return plainToClass(UserResponseDTO, entity);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get information about all users' })
  @ApiResponse({
    status: 200,
    type: UserResponseDTO,
  })
  @UseGuards(AuthGuard(), RolesGuard)
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Get()
  public async getUsers(): Promise<UserResponseDTO[]> {
    const allUsers = await this.userService.findAll();
    return allUsers.map(user => {
      return plainToClass(UserResponseDTO, user);
    });
  }
}
