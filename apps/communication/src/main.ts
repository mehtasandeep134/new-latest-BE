import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CommunicationModule } from './communication.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommunicationModule,
    {
      transport: Transport.TCP,
    },
  );
  app.listen();
}
bootstrap();
