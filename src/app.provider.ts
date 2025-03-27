import { Injectable } from '@nestjs/common';

@Injectable() // is necessary for class to be provider
export class AppService {
  getUsers(): string {
    return 'Users are retrieving';
  }
}
