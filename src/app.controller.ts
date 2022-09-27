import { Controller, Get } from '@nestjs/common';
import CrawlerService from './crawler/crawler.service';

@Controller()
export class AppController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('crawling')
  async crawling() {
    const userIds = process.env.USER_ID.split(',');
    const userPwds = process.env.USER_PASSWORD.split(',');
    const addresses = process.env.RECEIVE_ADDRESS.split(',');

    for (let i = 0; i < userIds.length; i++) {
      await this.crawlerService.getGoerliFaucet(
        userIds[i],
        userPwds[i],
        addresses[i],
      );
    }
  }
}
