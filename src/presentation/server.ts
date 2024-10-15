import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started");
    const URL = "https://www.google.com";
    CronService.createJob({
      cronTime: "*/5 * * * * *",
      onTick: () => {
        new CheckService(
          () => {
            console.log(`${URL} is ok`);
          },
          (error) => {
            console.log(error);
          }
        ).execute(URL);
      },
    });
  }
}
