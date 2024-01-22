import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  NestMiddleware,
} from '@nestjs/common';
import { loadNuxt, build } from 'nuxt';

@Injectable()
export class NuxtService implements OnModuleInit, OnModuleDestroy {
  private nuxt;

  async onModuleInit() {
    // Загрузка Nuxt
    this.nuxt = await loadNuxt({ dev: true });
    // Сборка, если находимся в режиме разработки
    if (process.env.NODE_ENV !== 'production') {
      await build(this.nuxt);
    }
  }

  async onModuleDestroy() {
    // Здесь может быть код для остановки Nuxt, если это необходимо
  }

  getNuxt() {
    return this.nuxt;
  }
}

@Injectable()
export class NuxtMiddleware implements NestMiddleware {
  constructor(private readonly nuxtService: NuxtService) {}

  async use(req: any, res: any, next: () => void) {
    const nuxt = this.nuxtService.getNuxt();
    if (req.url.startsWith('/_nuxt')) {
      await nuxt.server.app(req, res);
    } else {
      next();
    }
  }
}
