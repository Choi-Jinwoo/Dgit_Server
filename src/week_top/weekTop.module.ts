import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekTopRepository } from './weekTop.repository';
import { WeekTopService } from './weekTop.service';
import { WeekTopController } from './weekTop.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeekTopRepository]),
  ],
  exports: [WeekTopService],
  controllers: [WeekTopController],
  providers: [WeekTopService],
})
export class WeekTopModule { }