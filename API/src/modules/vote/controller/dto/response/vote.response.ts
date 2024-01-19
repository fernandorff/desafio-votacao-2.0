import { ApiProperty } from '@nestjs/swagger';
import { DecisionEnum } from '@/modules/vote/entity/decision.enum';
import { UserResponse } from '@/modules/user/controller/dto/response/user.response';
import { VotingSessionResponse } from '@/modules/voting-session/controller/dto/response/voting-session.response';
import { Expose, Type } from 'class-transformer';

export class VoteResponse {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ enum: DecisionEnum, example: DecisionEnum.YES })
  @Expose()
  decision: string;

  @ApiProperty()
  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;

  @ApiProperty()
  @Expose()
  @Type(() => VotingSessionResponse)
  votingSession: VotingSessionResponse;
}
