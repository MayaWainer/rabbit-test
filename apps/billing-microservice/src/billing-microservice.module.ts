import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UsageTrackingConsumerService } from './consumerTest';
import { RPCConsumerService } from './rpcConsumer';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: 'amqp://rabbitmq:5672',
      // connectionInitOptions: { wait: false },
    }),
  ],
  providers: [UsageTrackingConsumerService, RPCConsumerService],
})
export class BillingMicroserviceModule {}
