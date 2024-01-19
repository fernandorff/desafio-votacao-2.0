import { BadRequestException, Injectable } from '@nestjs/common';
import { UserReadService } from '@/modules/user/service/user.read.service';
import { UserWriteService } from '@/modules/user/service/user.write.service';
import { compare, genSalt, hash } from 'bcrypt';
import { CreateUserRequest } from '@/modules/user/controller/dto/request/create-user.request';
import { UserEntity } from '@/modules/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userReadService: UserReadService,
    private userWriteService: UserWriteService,
  ) {}

  async signUp(request: CreateUserRequest) {
    let user: UserEntity;

    try {
      user = await this.userReadService.getByEmail(request.email);
    } catch (e) {}

    if (user) {
      throw new BadRequestException('E-mail already in use');
    }

    const salt = await genSalt();

    const hashedPassword = await hash(request.password, salt);

    return await this.userWriteService.create(request.email, hashedPassword);
  }

  async signIn(request: CreateUserRequest) {
    const user = await this.userReadService.getByEmail(request.email);

    if (!(await compare(request.password, user.password))) {
      throw new BadRequestException('Incorrect password');
    }

    return user;
  }
}
