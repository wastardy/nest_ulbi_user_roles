import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import errorConstants from 'src/constants/error.constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request & { user?: any }>();

    const authHeader = req.headers['authorization'] as string | undefined;
    if (!authHeader) {
      throw new UnauthorizedException(errorConstants.USER_NOT_AUTHORIZED);
    }

    const [bearer, token] = (authHeader || '').split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(errorConstants.USER_NOT_AUTHORIZED);
    }

    try {
      const user = this.jwtService.verify<{ id: string; email: string }>(token);
      req.user = user;
      return true;
    } catch {
      throw new UnauthorizedException(errorConstants.USER_NOT_AUTHORIZED);
    }
  }
}
