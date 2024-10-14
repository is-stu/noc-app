import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started");
    CronService.createJob({
      cronTime: "*/5 * * * * *",
      onTick: () => {
        console.log("every 5 seconds", new Date());
      },
    });
  }
}
