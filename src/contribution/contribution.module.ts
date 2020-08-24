import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContributionController } from './contribution.controller';
import { ContributionService } from './contribution.service';
import { UserService } from 'src/user/user.service';
import { ContributionRepository } from './contribution.repository';
import { UserRepository } from 'src/user/user.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([ContributionRepository]),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [ContributionController],
  providers: [
    ContributionService,
    UserService,
  ],
})
export class ContributionModule { }
