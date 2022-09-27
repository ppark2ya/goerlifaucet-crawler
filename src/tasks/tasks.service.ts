import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import CrawlerService from '../crawler/crawler.service';

@Injectable()
export class TasksService {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
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
