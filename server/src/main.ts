import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { NuxtMiddleware } from './nuxt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(NuxtMiddleware);

  await app.listen(3000);
}
bootstrap();
