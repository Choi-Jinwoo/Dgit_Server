import { Controller, Get } from '@nestjs/common';
import { IResponse } from 'src/interface/response.interface';
import { WeekTopService } from './weekTop.service';

@Controller('week-top')
export class WeekTopController {

  constructor(
    private readonly weekTopService: WeekTopService,
  ) { }

  @Get('history')
  async getHistory(): Promise<IResponse> {
    const history = await this.weekTopService.getHistory();
    return {
      message: '주간 랭킹 기록 조회 성공',
      data: {
        history,
      },
    };
  }

}