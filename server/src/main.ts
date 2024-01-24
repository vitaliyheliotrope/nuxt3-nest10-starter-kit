import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

// TODO: Value can be taken from env-variable
const isDev = false;

async function runCommand(command, cwd = '..') {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
  } catch (error) {
    console.error(`Error executing command ${command}:`, error);
    throw error; // Rethrow the error if you need to handle it at a higher level
  }
}

async function bootstrapNuxt() {
  console.log('Removing previous build...');
  await runCommand('rm -rf .output');

  console.log('Building Nuxt...');
  await runCommand('npm run build');

  console.log('Starting Nuxt...');
  await runCommand('npm run start');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  if (isDev) {
    console.log('Running in development mode...');
    await runCommand('npm run dev');
  } else {
    await bootstrapNuxt();
  }
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1); // Terminate the process with an error code
});
