import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL || true,
  });

  await app.listen(3001);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});

//  Alternative solution by explicitly ignoring the Promise with void operator
// void bootstrap();
