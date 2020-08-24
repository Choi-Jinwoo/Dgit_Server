import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContributionController } from './contribution.controller';
import { ContributionService } from './contribution.service';
import { ContributionRepository } from './contribution.repository';
import { GithubLib } from 'src/lib/github.lib';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ContributionRepository]),
    UserModule,
  ],
  controllers: [ContributionController],
  providers: [
    ContributionService,
    GithubLib,
  ],
})
export class ContributionModule { }
