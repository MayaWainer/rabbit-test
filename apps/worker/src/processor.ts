import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { Queues } from './bullconfig';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Processor(Queues.Worker)
export class WorkerProcessor extends WorkerHost {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @InjectQueue(Queues.Worker) private workerQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    console.log('processing job', job.name);
    await this.amqpConnection.publish(
      'exchange1',
      'key',
      'rabbit message from worker',
    );
    console.log('rabbit sent from worker');
  }
}
