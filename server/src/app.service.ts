import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTodos(): string {
    return 'Here are your todos';
  }
  getUsers(): string {
    return 'And here are your users';
  }
}
