import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import crawler from './crawler';
require('chromedriver');

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    crawler();
  }
}
