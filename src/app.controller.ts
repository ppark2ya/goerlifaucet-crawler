import { Controller, Get } from '@nestjs/common';
import CrawlerService from './crawler/crawler.service';

@Controller()
export class AppController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('crawling')
  crawling() {
    this.crawlerService.getGoerliFaucet();
  }
}
