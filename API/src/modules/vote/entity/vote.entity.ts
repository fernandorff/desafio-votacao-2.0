import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { VotingSessionEntity } from '@/modules/voting-session/entity/voting-session.entity';
import { BaseEntity } from '@/shared/entity/base.entity';
import { DecisionEnum } from '@/modules/vote/entity/decision.enum';

@Entity()
@Unique(['user', 'votingSession'])
export class VoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  decision: DecisionEnum;

  @ManyToOne(() => UserEntity, (user) => user.votes)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => VotingSessionEntity, (votingSession) => votingSession.votes)
  @JoinColumn()
  votingSession: VotingSessionEntity;
}
