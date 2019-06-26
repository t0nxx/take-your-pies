import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PieModule } from './pie/pie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot(), PieModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
