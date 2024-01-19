import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteEntity } from '@/modules/vote/entity/vote.entity';
import { VoteController } from '@/modules/vote/controller/vote.controller';
import { VoteService } from '@/modules/vote/service/vote.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([VoteEntity])],
  controllers: [VoteController],
  providers: [VoteService],
  exports: [VoteService],
})
export class VoteModule {}
