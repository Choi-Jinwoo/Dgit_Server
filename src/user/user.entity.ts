import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { CreateUserDTO } from './model/createUser.dto';

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
    name: 'is_allowed',
    default: false,
  })
  isAllowed!: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;
}
