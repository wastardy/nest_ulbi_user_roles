/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/roles/user-roles.model';
import errorConstants from 'src/constants/error.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers['authorization'] as string;
      if (!authHeader) {
        throw new UnauthorizedException(errorConstants.USER_NOT_AUTHORIZED);
      }

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(errorConstants.USER_NOT_AUTHORIZED);
      }

      const user = this.jwtService.verify<{ roles: UserRoles[] }>(token);
      req.user = user;

      return user.roles.some((role: UserRoles) => requiredRoles.includes(role));
    } catch {
      throw new ConflictException(errorConstants.ACCESS_FORBIDDEN);
    }
  }
}
