import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Contribution } from './contribution.entity';
import { ContributionRepository } from './contribution.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ContributionService {

  constructor(
    @InjectRepository(Contribution)
    private readonly contributionRepository: ContributionRepository,
    private readonly userService: UserService,
  ) { }

  async initContribution(): Promise<void> {
    await this.contributionRepository.deleteAll();
  }

}
