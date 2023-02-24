import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { CompanyModule } from './company.module';
import 'reflect-metadata';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from 'apps/swagger/swagger';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(
    CompanyModule,
  );
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     port: process.env.COMPANY_PORT || 3301,
  //   },
  // });
  SwaggerModule.setup(
    'api/v1',
    app,
    createDocument(app),
  );
  await app.startAllMicroservices();
  await app.listen(
    process.env.COMPANY_PORT || 3301,
  );
  console.info(
    'SERVER IS RUNNING ON PORT',
    process.env.COMPANY_PORT || 3301,
  );
}
bootstrap();
