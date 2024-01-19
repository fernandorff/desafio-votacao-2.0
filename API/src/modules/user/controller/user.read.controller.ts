import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserReadService } from '@/modules/user/service/user.read.service';
import { UserResponse } from '@/modules/user/controller/dto/response/user.response';
import { Serialize } from '@/shared/interceptors/serialize.interceptor';

@Controller('user')
@ApiTags('User')
@Serialize(UserResponse)
export class UserReadController {
  constructor(private userReadService: UserReadService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Return users by id.' })
  async findById(@Param('id') id: string) {
    return await this.userReadService.getById(parseInt(id));
  }

  @Get()
  @ApiOperation({ summary: 'Returns all registered users.' })
  @ApiOkResponse({
    description: 'A list of users',
    type: UserResponse,
    isArray: true,
  })
  async findAllUsers() {
    return await this.userReadService.findAll();
  }
}
