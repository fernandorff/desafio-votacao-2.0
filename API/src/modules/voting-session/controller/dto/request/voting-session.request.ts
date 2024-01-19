import { IsDateString, IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVotingSessionRequest {
  @IsString()
  @ApiProperty({ example: 'Voting title' })
  title: string;

  @IsNumber()
  @ApiProperty({ example: 600 })
  duration: number;

  @IsString()
  @ApiProperty({ example: 'Description about the voting' })
  description: string;

  @IsUrl()
  @ApiProperty({ example: 'http://example.com/banner.jpg' })
  bannerImageUrl: string;

  @IsDateString()
  @ApiProperty({ example: '2023-03-15T00:00:00Z' })
  startDateTime: Date;

  @IsDateString()
  @ApiProperty({ example: '2023-03-25T00:00:00Z' })
  endDateTime: Date;
}
