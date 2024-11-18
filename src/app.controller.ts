import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RmqContext, Ctx } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('pattern')
  getNotifications(@Payload() data: object, @Ctx() context: RmqContext) {
    this.appService.sendNotificationWithDelay(data)
  }
}
