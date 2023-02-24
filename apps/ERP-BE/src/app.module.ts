import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModuleDBModule } from 'apps/validations/validation.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    // DatabaseDBModule,
    // ConfigModuleDBModule,
    ClientsModule.register([
      {
        name: 'COMPANY',
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 3301 },
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 3302 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
