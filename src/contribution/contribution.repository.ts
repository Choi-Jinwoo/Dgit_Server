import { EntityRepository, Repository, DeleteResult } from 'typeorm';

import { Contribution } from './contribution.entity';

@EntityRepository(Contribution)
export class ContributionRepository extends Repository<Contribution> {

  deleteAll(): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .execute();
  }
}