import { NestFactory } from '@nestjs/core';
import { BillingMicroserviceModule } from './billing-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingMicroserviceModule);
  await app.listen(82);
}
bootstrap().then();
