import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TotalTopRepository } from './totalTop.repository';
import { UserModule } from 'src/user/user.module';
import { TotalTopController } from './totalTop.controller';
import { TotalTopService } from './totalTop.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TotalTopRepository]),
    UserModule,
  ],
  exports: [TotalTopService],
  controllers: [TotalTopController],
  providers: [
    TotalTopService,
  ],
})
export class TotalTopModule { }
