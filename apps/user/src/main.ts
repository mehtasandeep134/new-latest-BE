import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { createDocument } from 'apps/swagger/swagger';
import { UserModule } from './user.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(
    UserModule,
    { cors: true },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     port: process.env.USER_PORT || 3302,
  //   },
  // });
  SwaggerModule.setup(
    'api/v1',
    app,
    createDocument(app),
  );
  await app.startAllMicroservices();
  await app.listen(process.env.USER_PORT || 3302);
  console.info(
    'SERVER IS RUNNING ON PORT',
    process.env.USER_PORT || 3302,
  );
}
bootstrap();
