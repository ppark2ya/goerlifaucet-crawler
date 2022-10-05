import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DAY, MILLISECOND, MINUTE } from 'src/constants/time';
import { MemoryDB } from 'src/utils/memory.db';
import CrawlerService from '../crawler/crawler.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly memoryDB: MemoryDB,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    const userIds = process.env.USER_ID.split(',');
    const userPwds = process.env.USER_PASSWORD.split(',');
    const addresses = process.env.RECEIVE_ADDRESS.split(',');

    for (let i = 0; i < userIds.length; i++) {
      const prevRuntime = this.memoryDB.get(userIds[i]) ?? 0;
      const currentTime = new Date().getTime();

      // When the job was previously run for less than a day
      let delay = MILLISECOND;
      const diffRuntime = currentTime - prevRuntime;
      if (diffRuntime <= DAY) {
        delay += diffRuntime + MINUTE;
      }

      await this.crawlerService.getGoerliFaucet(
        userIds[i],
        userPwds[i],
        addresses[i],
        delay,
      );
    }
  }
}
