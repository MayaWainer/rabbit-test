import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('addJob')
  async addJob(): Promise<any> {
    console.log('received add job');
    await this.appService.addJob();
    return 'done';
  }

  @Post('sendRabbit')
  async sendRabbit(): Promise<any> {
    console.log('received request to send rabbit - sendRabbit');
    await this.appService.sendRabbit();
    return 'done sending rabbit from api';
  }

  @Post('rabbitApiRequest')
  async rabbitApiRequest(): Promise<any> {
    console.log('received request to send rabbit - rabbitApiRequest ');
    await this.appService.sendRabbitForApiRequest();
    return 'done sending rabbit from api';
  }

  @Post('sendRabbitForRpc')
  async sendRabbitForRpc(): Promise<any> {
    console.log('received request to send rabbit - rabbitRpcRequest ');
    const res = await this.appService.sendRabbitForRpc();
    return res;
  }
}
