import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.provider';

@Controller('/api')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/users')
  getUsers(): string {
    return this.appService.getUsers();
  }
}
