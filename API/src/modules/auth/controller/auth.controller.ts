import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@/modules/auth/service/auth.service';
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { CreateUserRequest } from '@/modules/user/controller/dto/request/create-user.request';
import { UserEntity } from '@/modules/user/entity/user.entity';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/who-am-i')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Return current logged in users.' })
  whoAmI(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Post('/sign-up')
  @ApiOperation({ summary: 'Registers new users.' })
  async createUser(@Body() request: CreateUserRequest) {
    return await this.authService.signUp(request);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign in with registered users.' })
  async signIn(@Body() request: CreateUserRequest, @Session() session: any) {
    const user = await this.authService.signIn(request);
    session.userId = user.id;
    return user;
  }

  @Post('/sign-out')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Signs out from session.' })
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
