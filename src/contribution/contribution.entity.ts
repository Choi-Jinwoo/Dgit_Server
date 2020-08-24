import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  RelationId,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { DayOfWeek } from 'src/enum/day_of_week.enum';
import { User } from 'src/user/user.entity';

@Entity('contribution')
export class Contribution {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: number;

  @Column({
    name: 'contribution_count',
    default: 0,
  })
  contributionCount!: number;

  @Column({
    name: 'date',
  })
  date!: Date;

  @Column({
    name: 'week_day',
    type: 'enum',
    enum: DayOfWeek,
  })
  weekDay!: DayOfWeek;

  @RelationId((contribution: Contribution) => contribution.user)
  userID!: number;

  @JoinColumn({ name: 'fk_user_id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user!: User;
}
