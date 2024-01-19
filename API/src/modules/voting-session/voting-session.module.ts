import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotingSessionEntity } from '@/modules/voting-session/entity/voting-session.entity';
import { VotingSessionController } from '@/modules/voting-session/controller/voting-session.controller';
import { VotingSessionService } from '@/modules/voting-session/service/voting-session.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([VotingSessionEntity])],
  controllers: [VotingSessionController],
  providers: [VotingSessionService],
  exports: [VotingSessionService],
})
export class VotingSessionModule {}
