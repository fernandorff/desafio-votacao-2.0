import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { VoteEntity } from '@/modules/vote/entity/vote.entity';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { BaseEntity } from '@/shared/entity/base.entity';

@Entity()
export class VotingSessionEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  duration: number;

  @Column()
  description: string;

  @Column()
  bannerImageUrl: string;

  @Column({ type: 'datetime' })
  startDateTime: Date;

  @Column({ type: 'datetime' })
  endDateTime: Date;

  @OneToMany(() => VoteEntity, (vote) => vote.votingSession, {
    eager: true,
  })
  votes: VoteEntity[];

  @ManyToOne(() => UserEntity, (user) => user.votingSessions)
  @JoinColumn()
  user: UserEntity;
}
