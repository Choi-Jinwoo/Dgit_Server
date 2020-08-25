import { Controller, Get } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { User } from 'src/user/user.entity';

@Controller('contribution')
export class ContributionController {
  constructor(
    private readonly contributionService: ContributionService,
  ) { }

  @Get('total-rank')
  async getTotalRank(): Promise<User[]> {
    const userRank = await this.contributionService.getTotalRank();
    return userRank;
  }
}
