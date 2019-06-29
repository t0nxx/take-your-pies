import { Module } from '@nestjs/common';
import { PieService } from './pie.service';
import { PieController } from './pie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pie } from './pie.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import * as multer from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pie]),
    MulterModule.register({

      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads');
        },
        filename(req, file, cb) {
          cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
        },
      })
    })
  ],
  providers: [PieService],
  controllers: [PieController]
})
export class PieModule { }
