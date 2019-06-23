import { Module } from '@nestjs/common';
import { PieService } from './pie.service';
import { PieController } from './pie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pie } from './pie.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Pie])],
  providers: [PieService],
  controllers: [PieController]
})
export class PieModule {}
