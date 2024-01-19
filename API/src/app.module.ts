import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { APP_PIPE } from '@nestjs/core';
import { VoteEntity } from '@/modules/vote/entity/vote.entity';
import { AuthModule } from '@/modules/auth/auth.module';
import { VoteModule } from '@/modules/vote/vote.module';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserModule } from '@/modules/user/user.module';
import { VotingSessionEntity } from '@/modules/voting-session/entity/voting-session.entity';
import { VotingSessionModule } from '@/modules/voting-session/voting-session.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get('DB_NAME'),
          synchronize: true,
          entities: [UserEntity, VotingSessionEntity, VoteEntity],
          autoLoadEntities: true,
        };
      },
    }),
    AuthModule,
    UserModule,
    VotingSessionModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['keys'],
        }),
      )
      .forRoutes('*');
  }
}
