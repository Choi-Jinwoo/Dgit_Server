import {
  Entity,
  PrimaryGeneratedColumn,
  RelationId,
  JoinColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('week_top')
export class WeekTop {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: number;

  @RelationId((weekTop: WeekTop) => weekTop.user)
  userID!: string | null;

  @JoinColumn({ name: 'fk_user_id' })
  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  user!: User | null;

  @Column({ name: 'week_contributions' })
  weekContributions!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}