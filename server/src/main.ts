import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  eval(`import('nuxt')`).then(async ({ loadNuxt }) => {
    const nuxt = await loadNuxt({ dev: true });
    console.log(nuxt);

    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  });
}
bootstrap();
