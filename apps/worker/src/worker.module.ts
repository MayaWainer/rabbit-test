import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullConfig, queuesName } from './bullconfig';
import { WorkerProcessor } from './processor';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    BullModule.forRootAsync({ useClass: BullConfig }),
    BullModule.registerQueue(...queuesName),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: 'amqp://rabbitmq:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [],
  providers: [WorkerProcessor],
})
export class WorkerModule {}
