import { Controller, Get } from '@nestjs/common';
import crawler from './crawler';

@Controller()
export class AppController {
  @Get('crawling')
  async crawling() {
    crawler();
  }
}
