import { EntityRepository, Repository } from 'typeorm';
import { WeekTop } from './weekTop.entity';

@EntityRepository(WeekTop)
export class WeekTopRepository extends Repository<WeekTop> {

  findOrderByYearMonthWeekNumber(): Promise<WeekTop[]> {
    return this.createQueryBuilder()
      .orderBy('year', 'DESC')
      .addOrderBy('month', 'DESC')
      .addOrderBy('week_number', 'DESC')
      .getMany();
  }

}