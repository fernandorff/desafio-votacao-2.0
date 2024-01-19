import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { CreateVotingSessionRequest } from '@/modules/voting-session/controller/dto/request/voting-session.request';
import { VotingSessionService } from '@/modules/voting-session/service/voting-session.service';
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { Serialize } from '@/shared/interceptors/serialize.interceptor';
import { VotingSessionResponse } from '@/modules/voting-session/controller/dto/response/voting-session.response';
import { SuccessResponseInterceptor } from '@/shared/interceptors/success-response.interceptor';

@Controller('voting-session')
@ApiTags('Voting Session')
export class VotingSessionController {
  constructor(private votingSessionService: VotingSessionService) {}

  @Get()
  @Serialize(VotingSessionResponse)
  @UseInterceptors(new SuccessResponseInterceptor(200, 'Success'))
  async findAll() {
    return await this.votingSessionService.findAll();
  }

  @Get('/:id')
  @Serialize(VotingSessionResponse)
  @UseInterceptors(new SuccessResponseInterceptor(200, 'Success'))
  @ApiOperation({ summary: 'Return vote by id.' })
  async findById(@Param('id') id: string) {
    return await this.votingSessionService.findOne(parseInt(id));
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(new SuccessResponseInterceptor(201, 'Voting session created successfully'))
  async createVotingSession(@Body() body: CreateVotingSessionRequest, @CurrentUser() user: UserEntity) {
    await this.votingSessionService.create(body, user);
  }
}
