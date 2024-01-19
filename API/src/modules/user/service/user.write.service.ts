import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserReadService } from '@/modules/user/service/user.read.service';

@Injectable()
export class UserWriteService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    private userReadService: UserReadService,
  ) {}

  create(email: string, password: string) {
    const user = this.repository.create({ email, password });

    return this.repository.save(user);
  }

  async update(id: number, attrs: Partial<UserEntity>) {
    const user = await this.userReadService.getById(id);
    Object.assign(user, attrs);
    return this.repository.save(user);
  }

  async remove(id: number, session: any) {
    const user = await this.userReadService.getById(id);
    if (id === session.userId) {
      session.userId = null;
    }
    return this.repository.remove(user);
  }
}
