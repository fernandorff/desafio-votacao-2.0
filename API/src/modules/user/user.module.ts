import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserReadController } from '@/modules/user/controller/user.read.controller';
import { UserReadService } from '@/modules/user/service/user.read.service';
import { CurrentUserMiddleware } from '@/modules/auth/middlewares/current-user.middleware';
import { UserWriteService } from '@/modules/user/service/user.write.service';
import { UserWriteController } from '@/modules/user/controller/user.write.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserReadController, UserWriteController],
  providers: [UserReadService, UserWriteService],
  exports: [UserReadService, UserWriteService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
