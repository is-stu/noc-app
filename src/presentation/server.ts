import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasoruce';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

const logRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
  public static start() {
    console.log('Server started');
    const URL = 'https://www.google.com';
    CronService.createJob({
      cronTime: '*/5 * * * * *',
      onTick: () => {
        new CheckService(
          logRepository,
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
