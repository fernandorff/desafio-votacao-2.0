import { Body, Controller, Delete, Param, Patch, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserWriteService } from '@/modules/user/service/user.write.service';
import { UserResponse } from '@/modules/user/controller/dto/response/user.response';
import { UpdateUserRequest } from '@/modules/user/controller/dto/request/update-user.request';
import { Serialize } from '@/shared/interceptors/serialize.interceptor';

@Controller('user')
@ApiTags('Users')
@Serialize(UserResponse)
export class UserWriteController {
  constructor(private userWriteService: UserWriteService) {}

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete users by id.' })
  async removeUser(@Param('id') id: string, @Session() session: any) {
    return await this.userWriteService.remove(parseInt(id), session);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update users by id.' })
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserRequest) {
    return await this.userWriteService.update(parseInt(id), body);
  }
}
