import { Column, Entity, OneToMany } from 'typeorm';
import { VoteEntity } from '@/modules/vote/entity/vote.entity';
import { VotingSessionEntity } from '@/modules/voting-session/entity/voting-session.entity';
import { BaseEntity } from '@/shared/entity/base.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @OneToMany(() => VoteEntity, (vote) => vote.user, {
    eager: true,
  })
  votes: VoteEntity[];

  @OneToMany(() => VotingSessionEntity, (votingSession) => votingSession.user, {
    eager: true,
  })
  votingSessions: VotingSessionEntity[];
}
