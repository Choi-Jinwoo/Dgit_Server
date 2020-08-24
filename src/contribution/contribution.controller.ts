import { Controller, Get } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { runInThisContext } from 'vm';

@Controller('contribution')
export class ContributionController {
  constructor(
    private readonly contributionService: ContributionService,
  ) { }
}
