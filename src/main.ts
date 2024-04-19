import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envVars from './common/config/envs';
import { Logger } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Orders');
   await app.listen(envVars.PORT);
   logger.log(`Environment: ${envVars.PORT}`)
}
main();
