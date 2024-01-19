import { ApiProperty } from '@nestjs/swagger';
import { VoteResponse } from '@/modules/vote/controller/dto/response/vote.response';
import { VotingSessionResponse } from '@/modules/voting-session/controller/dto/response/voting-session.response';
import { Expose, Type } from 'class-transformer';

export class UserResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  admin: boolean;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  cpf: string;

  @ApiProperty()
  @Expose()
  birth: Date;

  @ApiProperty()
  @Expose()
  @Type(() => VoteResponse)
  votes: VoteResponse[];

  @ApiProperty()
  @Expose()
  @Type(() => VotingSessionResponse)
  votingSessions: VotingSessionResponse[];
}
