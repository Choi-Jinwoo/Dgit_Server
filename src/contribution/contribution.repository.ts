import { EntityRepository, Repository, DeleteResult } from 'typeorm';

import { Contribution } from './contribution.entity';

@EntityRepository(Contribution)
export class ContributionRepository extends Repository<Contribution> {

  deleteAll(): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .execute();
  }

  findByUserAndStartDateAndEndDate(userID: string, startDate: Date, endDate: Date): Promise<Contribution[]> {
    return this.createQueryBuilder()
      .where('fk_user_id = :userID', { userID })
      .andWhere('DATE(date) >= :startDate', { startDate })
      .andWhere('DATE(date) <= :endDate', { endDate })
      .getMany();
  }

}