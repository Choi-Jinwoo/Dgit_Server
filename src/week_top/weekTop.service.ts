import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeekTop } from './weekTop.entity';
import { WeekTopRepository } from './weekTop.repository';

@Injectable()
export class WeekTopService {

  constructor(
    @InjectRepository(WeekTop)
    private readonly weekTopRepository: WeekTopRepository,
  ) { }

  async getHistory(): Promise<WeekTop[]> {
    const weekTop = await this.weekTopRepository.findOrderByYearMonthWeekNumber();
    return weekTop;
  }

}