import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/user/user.interface';

export const RequiredRoles = (...requiredRoles: UserRole[]) =>
  SetMetadata('roles', requiredRoles);
