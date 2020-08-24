import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionController } from './contribution.controller';
import { ContributionService } from './contribution.service';
import { ContributionRepository } from './contribution.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([ContributionRepository]),
  ],
  controllers: [ContributionController],
  providers: [ContributionService],
})
export class ContributionModule { }
