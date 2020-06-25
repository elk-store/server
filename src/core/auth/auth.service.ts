import { randomBytes } from 'crypto';

import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../modules/user/user.service';
import {
  LoginPayload,
  JwtResponse,
  JwtPayload,
  PasswordRecoveryCache,
} from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
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

  public async sendRecoveryPasswordEmail(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user && !PasswordRecoveryCache.list[email]) {
      const API_KEY = this.configService.get('MAILGUN_API_KEY');
      const DOMAIN = this.configService.get('MAILGUN_DOMAIN');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mailgun = require('mailgun-js')({
        apiKey: API_KEY,
        domain: DOMAIN,
      });

      const code = randomBytes(20).toString('hex');
      PasswordRecoveryCache.list[email] = code;

      const data = {
        from: 'dontreply@' + DOMAIN,
        to: email,
        subject: 'Password Recovery',
        text:
          'Hey, ' +
          user.name +
          '\n\nUse this code to reset your password: ' +
          code +
          '\n\nCopy the recovery code into this page: RECOVERY_PAGE',
      };

      await mailgun.messages().send(data);
    }
  }

  public async verifyCodeAndChangePassword(code: string, password: string) {
    const email = this.getEmailByCode(code);
    if (!email) {
      PasswordRecoveryCache.list[email] = undefined;
      await this.userService.changePassword(email, password).then(() => {
        throw new HttpException('Password changed', HttpStatus.OK);
      });
    }
    throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
  }

  private getEmailByCode(code: string): string {
    for (const [email, value] of Object.entries(PasswordRecoveryCache.list)) {
      if (code == value) {
        return email;
      }
    }
    return undefined;
  }
}
