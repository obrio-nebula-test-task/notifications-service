import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CronJob } from 'cron';

@Injectable()
export class AppService {
  async sendNotificationWithDelay(data: object): Promise<void> {
    const now = new Date();
    const scheduleTime = new Date(now.getTime() + process.env.NOTIFICATION_DELAY);
    const job = new CronJob(
      scheduleTime,
      async () => {
        await axios.post(process.env.NOTIFICATIONS_URL, data);
      },
      null,
      true,
      'UTC'
    );
    
    job.start();
  }
}
