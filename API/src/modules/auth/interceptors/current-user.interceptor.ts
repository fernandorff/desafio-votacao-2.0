import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserReadService } from '@/modules/user/service/user.read.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UserReadService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      try {
        request.currentUser = await this.usersService.getById(userId);
      } catch (e) {
        request.session.userId = null;
      }
    }

    return handler.handle();
  }
}
