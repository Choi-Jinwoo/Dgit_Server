import { Controller, Get } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { User } from 'src/user/user.entity';
import { IResponse } from 'src/interface/response.interface';

@Controller('contribution')
export class ContributionController {
  constructor(
    private readonly contributionService: ContributionService,
  ) { }

  @Get('total-rank')
  async getTotalRank(): Promise<IResponse> {
    const userRank = await this.contributionService.getTotalRank();

    return {
      message: '전체 순위 조회 성공',
      data: {
        userRank,
      },
    }
  }
}
