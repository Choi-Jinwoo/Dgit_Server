import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { type } from 'os';

@Entity('user')
export class User {
  @PrimaryColumn({
    name: 'user_id',
  })
  userID!: string;

  @Column({
    name: 'name',
  })
  name!: string;

  @Column({
    name: 'total_contributions',
  })
  totalContributions!: number;

  @Column({
    name: 'user_image',
    nullable: true,
  })
  userImage!: string;

  @Column({
    name: 'bio',
    nullable: true,
    type: 'varchar',
  })
  bio!: string | null;

  @Column({
    name: 'is_allowed',
    default: false,
  })
  isAllowed!: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;
}
