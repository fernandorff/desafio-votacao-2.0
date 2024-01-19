import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { VoteResponse } from '@/modules/vote/controller/dto/response/vote.response';
import { UserResponse } from '@/modules/user/controller/dto/response/user.response';

export class VotingSessionResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({ example: 'Voting title' })
  @Expose()
  title: string;

  @ApiProperty({ example: 'Description about the voting' })
  @Expose()
  description: string;

  @ApiProperty({ example: 'http://example.com/banner.jpg' })
  @Expose()
  bannerImageUrl: string;

  @ApiProperty({ example: '2023-03-15T00:00:00Z' })
  @Expose()
  startDateTime: Date;

  @ApiProperty({ example: '2023-03-25T00:00:00Z' })
  @Expose()
  endDateTime: Date;

  @ApiProperty()
  @Expose()
  @Type(() => VoteResponse)
  votes: VoteResponse[];

  @ApiProperty()
  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;
}
