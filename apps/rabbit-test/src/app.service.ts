import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queues } from './bullconfig';
import { Queue } from 'bullmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AppService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @InjectQueue(Queues.Worker) private workerQueue: Queue,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addJob() {
    const job = await this.workerQueue.add('sendMessage', { message: 'hi' });
    return job;
  }

  async sendRabbit() {
    await this.amqpConnection.publish(
      'exchange1',
      'key',
      'rabbit message from api',
    );
    console.log('rabbit sent');
  }

  async sendRabbitForApiRequest() {
    await this.amqpConnection.publish(
      'exchange1',
      'apiRequest',
      'rabbit message from api for api request',
    );
    console.log('rabbit sent');
  }

  async sendRabbitForRpc() {
    const response = await this.amqpConnection.request<any>({
      exchange: 'exchange1',
      routingKey: 'rpc-route',
      payload: {
        request: 'request from api',
      },
      timeout: 10000, // optional timeout for how long the request
      // should wait before failing if no response is received
    });
    console.log(response);
    return response;
  }
}
