import { CronJob } from "cron";

interface createJobOptions {
  cronTime: string;
  onTick: () => void;
}

export class CronService {
  public static createJob({ cronTime, onTick }: createJobOptions) {
    const job = new CronJob(cronTime, onTick);

    job.start();

    return job;
  }
}
