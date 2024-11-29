import { LogEntity, LogSererityLevel } from '../entities/log.entity';

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSererityLevel): Promise<LogEntity[]>;
}
