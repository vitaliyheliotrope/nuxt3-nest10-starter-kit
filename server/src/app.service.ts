import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTodos(): string {
    return 'Here are your todos api';
  }
  getUsers(): string {
    return 'And here are your users api';
  }
}
