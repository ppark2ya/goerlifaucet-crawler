import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import CrawlerService from '../crawler/crawler.service';

@Injectable()
export class TasksService {
  constructor(private readonly crawlerService: CrawlerService) {}

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.crawlerService.getGoerliFaucet();
  }
}
