import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entity/user.entity';

type Relations = Pick<UserEntity, 'votes' | 'votingSessions'>;
type RelationKeys = keyof Relations;
const RELATIONS: RelationKeys[] = ['votes', 'votingSessions'];

@Injectable()
export class UserReadService {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

  async getById(id: number) {
    const user = await this.repository.findOne({
      where: { id: id },
      relations: RELATIONS,
    });

    if (!user) {
      throw new NotFoundException('User not found with id: ' + id);
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.repository.findOne({
      where: { email },
      relations: RELATIONS,
    });

    if (!user) {
      throw new NotFoundException('User not found with email: ' + email);
    }

    return user;
  }

  findAll() {
    return this.repository.find({
      relations: RELATIONS,
    });
  }
}
