import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envVars from './common/config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
      options: {
        servers: envVars.NATS_SERVERS,
      }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  await app.listen();
}
main();
