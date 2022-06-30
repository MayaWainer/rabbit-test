import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConsumeMessage, Channel } from 'amqplib';
import axios from 'axios';

@Injectable()
export class UsageTrackingConsumerService {
  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'key',
    queue: 'queueName',
    errorHandler: (channel: Channel, msg: ConsumeMessage, error: Error) => {
      console.log(error);
      channel.reject(msg, false);
    },
  })
  public async onQueueConsumption(msg: any, amqpMsg: ConsumeMessage) {
    const eventData = JSON.parse(amqpMsg.content.toString());
    console.log(`EventData: ${eventData}, successfully consumed!`);
  }

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'apiRequest',
    queue: 'queueName',
    errorHandler: (channel: Channel, msg: ConsumeMessage, error: Error) => {
      console.log(error);
      channel.reject(msg, false);
    },
  })
  public async sendApiRequest(msg: any, amqpMsg: ConsumeMessage) {
    const eventData = JSON.parse(amqpMsg.content.toString());
    console.log(`EventData: ${eventData}`);
    const res = await axios.get('http://rabbit-test:80');
    console.log(`EventData: ${res.data}, successfully consumed!`);
  }
}
