import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TotalTop } from './totalTop.entity';
import { TotalTopRepository } from './totalTop.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TotalTopService {

  constructor(
    @InjectRepository(TotalTop)
    private readonly totalTopRepository: TotalTopRepository,
    private readonly userService: UserService,
  ) { }

  async createTodayTotalTop(): Promise<void> {
    const topUser = await this.userService.getGreatestTotalContributionsUser();
    if (topUser !== null) {
      await this.totalTopRepository.save({
        user: topUser,
        date: new Date(),
      });
    }
  }

}