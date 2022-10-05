import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import CrawlerService from './crawler/crawler.service';
import { MemoryDB } from './utils/memory.db';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [TasksService, CrawlerService, MemoryDB],
})
export class AppModule {}
