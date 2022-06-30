import { Injectable } from '@nestjs/common';
import BullMq, { JobsOptions } from 'bullmq';
import { SharedBullConfigurationFactory } from '@nestjs/bullmq';

export enum Queues {
  Worker = 'Worker',
}

export const queuesName = Object.values(Queues).map((v) => ({ name: v }));

@Injectable()
export class BullConfig implements SharedBullConfigurationFactory {
  createSharedConfiguration(): BullMq.QueueOptions {
    return {
      defaultJobOptions: this.getDefaultJobOptions(),
      connection: this.getRedisConfig(),
    };
  }

  private getDefaultJobOptions(): JobsOptions {
    return {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: false,
      removeOnFail: false,
    };
  }

  private getRedisConfig(): any {
    return {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    };
  }
}
