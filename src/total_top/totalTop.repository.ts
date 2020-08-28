import { EntityRepository, Repository } from 'typeorm';

import { TotalTop } from './totalTop.entity';

@EntityRepository(TotalTop)
export class TotalTopRepository extends Repository<TotalTop> {

  findLatest(): Promise<TotalTop | undefined> {
    return this.createQueryBuilder()
      .orderBy('date', 'DESC')
      .getOne();
  }

  findAllOrderByDateDesc(): Promise<TotalTop[]> {
    return this.createQueryBuilder()
      .orderBy('date', 'DESC')
      .getMany();
  }

}