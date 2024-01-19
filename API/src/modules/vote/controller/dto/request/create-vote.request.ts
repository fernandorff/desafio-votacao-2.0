import { IsEnum, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DecisionEnum } from '@/modules/vote/entity/decision.enum';

export class CreateVoteRequest {
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 1 })
  votingSessionId: number;

  @IsEnum(DecisionEnum)
  @ApiProperty({ example: DecisionEnum.YES })
  decision: DecisionEnum;
}
