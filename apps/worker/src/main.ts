import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';

// NestFactory.createApplicationContext
// instead of running the entire HTTP server this is a lightweight standalone application
// that has no HTTP-related features (routing, but also guards, interceptors, pipes, etc.)

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerModule);
  // app.enableShutdownHooks();
}
bootstrap().then();
