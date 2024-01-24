import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec } from 'child_process';

const isDev = false;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  if (isDev) {
    exec('npm run dev', { cwd: '..' });
  } else {
    console.log('started...');
    exec('rm -rf .output', { cwd: '..' }).addListener('close', () => {
      console.log('removed output...');
      exec('npm run build', { cwd: '..' }).addListener('close', () => {
        console.log('build finished...');
        exec('npm run start', { cwd: '..' }).addListener('spawn', () => {
          console.log('nuxt app started...');
        });
      });
    });
  }
}

bootstrap();
