import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { VoteService } from '@/modules/vote/service/vote.service';
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { CreateVoteRequest } from '@/modules/vote/controller/dto/request/create-vote.request';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { VoteResponse } from '@/modules/vote/controller/dto/response/vote.response';
import { Serialize } from '@/shared/interceptors/serialize.interceptor';

@Controller('vote')
@ApiTags('Vote')
@Serialize(VoteResponse)
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Get()
  async findAll() {
    return await this.voteService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return vote by id.' })
  async findById(@Param('id') id: string) {
    return await this.voteService.findOne(parseInt(id));
  }

  @Post()
  @UseGuards(AuthGuard)
  async createVote(@Body() body: CreateVoteRequest, @CurrentUser() user: UserEntity) {
    return this.voteService.create(body, user);
  }
}
