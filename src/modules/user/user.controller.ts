import { Post, Body, Controller } from '@nestjs/common';

import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public signUp(@Body() payload: UserDTO) {
    return this.userService.signUp(payload);
  }
}
