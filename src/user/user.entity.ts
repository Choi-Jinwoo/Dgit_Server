import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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
    name: 'total_contribution',
  })
  totalContribution!: number;

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
