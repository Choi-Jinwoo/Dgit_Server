import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekTopRepository } from './weekTop.repository';
import { WeekTopService } from './weekTop.service';
import { WeekTopController } from './weekTop.controller';
import { ContributionModule } from 'src/contribution/contribution.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeekTopRepository]),
    UserModule,
    ContributionModule,
  ],
  exports: [WeekTopService],
  controllers: [WeekTopController],
  providers: [WeekTopService],
})
export class WeekTopModule { }