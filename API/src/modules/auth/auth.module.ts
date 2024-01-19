import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/controller/auth.controller';
import { AuthService } from '@/modules/auth/service/auth.service';
import { CurrentUserMiddleware } from '@/modules/auth/middlewares/current-user.middleware';

@Global()
@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
