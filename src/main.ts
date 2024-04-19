import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envVars from './common/config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function main() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: envVars.PORT
    }
  });
  await app.listen();
}
main();
