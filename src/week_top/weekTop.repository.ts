import { EntityRepository, Repository } from 'typeorm';
import { WeekTop } from './weekTop.entity';

@EntityRepository(WeekTop)
export class WeekTopRepository extends Repository<WeekTop> {

  findOrderByCreatedAtDesc(): Promise<WeekTop[]> {
    return this.createQueryBuilder()
      .orderBy('created_at', 'DESC')
      .getMany();
  }

}