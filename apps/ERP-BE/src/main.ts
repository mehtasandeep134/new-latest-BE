import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from 'apps/swagger/swagger';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import 'reflect-metadata';

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  SwaggerModule.setup('api/v1', app, createDocument(app));
  await app.listen(process.env.APP_PORT || 3300);
  console.info('SERVER IS RUNNING ON PORT', process.env.APP_PORT || 3300);
})();
