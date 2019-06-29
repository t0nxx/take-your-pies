import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.static(path.resolve(__dirname, '../uploads')));

  const options = new DocumentBuilder()
    .setTitle('Pie Doc')
    .setDescription('The Pie API description')
    .setVersion('1.0')
    .addTag('pie')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
