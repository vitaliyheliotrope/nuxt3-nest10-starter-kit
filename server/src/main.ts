import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec, execSync } from 'child_process';

const isDev = true;

async function bootstrap() {
  if (isDev) {
    exec('npm run dev', { cwd: '..' });
  } else {
    execSync('rm -rf .output', { cwd: '..' });
    execSync('npm run build', { cwd: '..' });
    execSync('npm run start', { cwd: '..' });
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}

bootstrap();
