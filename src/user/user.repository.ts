import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  findByIsAllowed(isAllowed: boolean): Promise<User[]> {
    return this.createQueryBuilder()
      .where('is_allowed = :isAllowed', { isAllowed })
      .getMany();
  }

  findByIsAllowedOrderByTotalContributionsDesc(isAllowed: boolean): Promise<User[]> {
    return this.createQueryBuilder()
      .where('is_allowed = :isAllowed', { isAllowed })
      .orderBy('total_contributions', 'DESC')
      .getMany();
  }

  findGreatestTotalContributions(): Promise<User | undefined> {
    return this.createQueryBuilder()
      .orderBy('total_contributions', 'DESC')
      .addOrderBy('created_at', 'ASC')
      .getOne();
  }
}
