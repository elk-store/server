import { Injectable } from '@nestjs/common';

import { LoginPayload } from './auth.interface';

@Injectable()
export class AuthService {
  public async login({ email, password }: LoginPayload): Promise<string> {
    const token = email + password;

    return token;
  }
}
