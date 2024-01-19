import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoteEntity } from '@/modules/vote/entity/vote.entity';
import { CreateVoteRequest } from '@/modules/vote/controller/dto/request/create-vote.request';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { VotingSessionService } from '@/modules/voting-session/service/voting-session.service';

type Relations = Pick<VoteEntity, 'user' | 'votingSession'>;
type RelationKeys = keyof Relations;
const RELATIONS: RelationKeys[] = ['user', 'votingSession'];

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteEntity)
    private voteRepo: Repository<VoteEntity>,
    private votingSessionService: VotingSessionService,
  ) {}

  findAll() {
    return this.voteRepo.find({
      relations: RELATIONS,
    });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.voteRepo.findOne({
      where: {
        id: id,
      },
      relations: RELATIONS,
    });
  }

  async create(request: CreateVoteRequest, user: UserEntity) {
    const votingSession = await this.votingSessionService.findOne(request.votingSessionId);

    const votes = await this.voteRepo
      .createQueryBuilder('vote') // Or whatever your repository is called
      .innerJoinAndSelect('vote.user', 'user')
      .innerJoinAndSelect('vote.votingSession', 'votingSession')
      .where('user.id = :userId AND votingSession.id = :votingSessionId', {
        userId: user.id,
        votingSessionId: votingSession.id,
      })
      .getMany();

    if (votes.length > 0) {
      throw new ConflictException('User has already voted in this voting session');
    }

    const vote = this.voteRepo.create(request);

    vote.votingSession = votingSession;

    vote.user = user;

    return this.voteRepo.save(vote);
  }
}
