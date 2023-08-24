import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleAdminGuard implements CanActivate {
  //   constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = context.switchToHttp().getRequest().user.role;

    if (!role || role != 'admin') throw new UnauthorizedException();

    return role == 'admin';
  }
}
