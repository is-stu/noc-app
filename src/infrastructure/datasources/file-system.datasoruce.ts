import * as fs from 'fs';

import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSererityLevel } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath: string = './logs';
  private readonly lowLogsPath: string = './logs/low-severity.log';
  private readonly mediumLogsPath: string = './logs/medium-severity.log';
  private readonly highLogsPath: string = './logs/high-severity.log';

  constructor() {
    this.createLogsDirectory();
  }

  private createLogsDirectory() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    [this.lowLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '');
        }
      }
    );
  }

  private getReadLogsEntities(path: string): LogEntity[] {
    const readLowLogs = fs.readFileSync(path, {
      encoding: 'utf-8',
    });
    return readLowLogs.split('\n').map(LogEntity.fromJson);
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)} \n`;

    if (newLog.level === LogSererityLevel.LOW)
      fs.appendFileSync(this.lowLogsPath, logAsJson);

    if (newLog.level === LogSererityLevel.MEDIUM)
      fs.appendFileSync(this.mediumLogsPath, logAsJson);

    if (newLog.level === LogSererityLevel.HIGH)
      fs.appendFileSync(this.highLogsPath, logAsJson);
    return;
  }

  async getLogs(severityLevel: LogSererityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSererityLevel.LOW:
        return this.getReadLogsEntities(this.lowLogsPath);
      case LogSererityLevel.MEDIUM:
        return this.getReadLogsEntities(this.mediumLogsPath);
      case LogSererityLevel.HIGH:
        return this.getReadLogsEntities(this.highLogsPath);
      default:
        throw new Error(`Invalid log severity level ${severityLevel}`);
    }
  }
}
