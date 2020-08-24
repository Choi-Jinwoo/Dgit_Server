import { Controller, Get } from '@nestjs/common';
import { ContributionService } from './contribution.service';

@Controller('contribution')
export class ContributionController {
  constructor(
    private readonly contributionService: ContributionService,
  ) { }
}
