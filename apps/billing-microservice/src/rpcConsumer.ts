import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConsumeMessage, Channel } from 'amqplib';

@Injectable()
export class RPCConsumerService {
  @RabbitRPC({
    exchange: 'exchange1',
    routingKey: 'rpc-route',
    queue: 'rpcQueue',
    errorHandler: (channel: Channel, msg: ConsumeMessage, error: Error) => {
      console.log(error);
      channel.reject(msg, false);
    },
  })
  public async onQueueConsumption(msg: any, amqpMsg: ConsumeMessage) {
    const eventData = JSON.parse(amqpMsg.content.toString());
    console.log(`EventData: ${eventData}, successfully consumed!`);
    return {
      response: 'hi im the rpc handler',
    };
  }
}
