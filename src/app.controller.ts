import { Controller, Get } from '@nestjs/common';
import crawler from './crawler';
require('chromedriver');

@Controller()
export class AppController {
  @Get('crawling')
  async crawling() {
    crawler();
  }
}
