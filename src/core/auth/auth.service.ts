import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

import { LoginPayload, JwtResponse, JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService
  ) {}

  public async login({ email, password }: LoginPayload): Promise<JwtResponse> {
    const user = await this.userService.findByEmail(email);
    const hasCorrectPassword = await user.hasCorrectPassword(password);

    if (!hasCorrectPassword) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { email };
    const token = await this.jwtService.sign(payload);

    return { token };
  }
}
