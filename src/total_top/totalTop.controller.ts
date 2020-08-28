import { Controller, Get } from '@nestjs/common';
import { TotalTopService } from './totalTop.service';
import { IResponse } from 'src/interface/response.interface';

@Controller('total-top')
export class TotalTopController {

  constructor(
    private readonly totalTopService: TotalTopService,
  ) { }

  @Get('current-streak')
  async getCurrentStreak(): Promise<IResponse> {
    const currentStreak = await this.totalTopService.getTotalTopStreak();
    return {
      message: '현재 탑 streak 조회 성공',
      data: {
        currentStreak,
      },
    }
  }
}
