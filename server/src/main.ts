import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec } from 'child_process';

const isDev = false;

async function bootstrap() {
  eval(`import('nuxt')`).then(async ({ loadNuxt, build }) => {
    const app = await NestFactory.create(AppModule);
    if (isDev) {
      exec('npm run dev', { cwd: '..' });
    } else {
      exec('npm run build', { cwd: '..' });
      exec('npm run start', { cwd: '..' });
    }

    await app.listen(3001);
  });
}
bootstrap();
