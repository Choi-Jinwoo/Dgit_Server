import {
  Entity,
  RelationId,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('total_top')
export class TotalTop {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: number;

  @RelationId((totalTop: TotalTop) => totalTop.user)
  userID!: string | null;

  @JoinColumn({ name: 'fk_user_id' })
  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  user!: User | null;

  @CreateDateColumn({
    name: 'date',
  })
  date!: Date;

}