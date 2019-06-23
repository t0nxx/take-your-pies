import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PieModule } from './pie/pie.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PieModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
