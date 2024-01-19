import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { CreateVotingSessionRequest } from '@/modules/voting-session/controller/dto/request/voting-session.request';
import { VotingSessionEntity } from '@/modules/voting-session/entity/voting-session.entity';

type Relations = Pick<VotingSessionEntity, 'user' | 'votes'>;
type RelationKeys = keyof Relations;
const RELATIONS: RelationKeys[] = ['user', 'votes'];

@Injectable()
export class VotingSessionService {
  constructor(
    @InjectRepository(VotingSessionEntity)
    private votingSessionRepo: Repository<VotingSessionEntity>,
  ) {}

  findAll() {
    return this.votingSessionRepo.find({
      relations: RELATIONS,
    });
  }

  async findOne(id: number) {
    const votingSession = await this.votingSessionRepo.findOne({
      where: {
        id: id,
      },
      relations: RELATIONS,
    });

    if (!votingSession) {
      throw new NotFoundException('Voting Session not found with id: ' + id);
    }

    return votingSession;
  }

  create(request: CreateVotingSessionRequest, user: UserEntity) {
    const votingSession = this.votingSessionRepo.create(request);

    if (request.duration) {
      const startDateTime = new Date(votingSession.startDateTime);
      votingSession.endDateTime = new Date(startDateTime.getTime() + request.duration * 1000);
    }

    votingSession.user = user;

    return this.votingSessionRepo.save(votingSession);
  }
}
