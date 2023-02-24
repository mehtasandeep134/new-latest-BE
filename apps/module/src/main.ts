import { NestFactory } from '@nestjs/core';
import { ModuleModule } from './module.module';
import { SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { createDocument } from 'apps/swagger/swagger';
import 'reflect-metadata';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

(async () => {
  const app = await NestFactory.create(
    ModuleModule,
  );
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     port: process.env.MODULE_PORT || 3400,
  //   },
  // });
  SwaggerModule.setup(
    'api/v1',
    app,
    createDocument(app),
  );
  await app.startAllMicroservices();
  await app.listen(
    process.env.MODULE_PORT || 3400,
  );
  console.info(
    'SERVER IS RUNNING ON PORT',
    process.env.MODULE_PORT || 3400,
  );
})();
