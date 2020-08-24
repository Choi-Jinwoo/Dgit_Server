import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  findByIsAllowed(isAllowed: boolean): Promise<User[]> {
    return this.createQueryBuilder()
      .where('is_allowed = :isAllowed', { isAllowed })
      .getMany();
  }

}
