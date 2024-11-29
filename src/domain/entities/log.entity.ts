export enum LogSererityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class LogEntity {
  public level: LogSererityLevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogSererityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  static fromJson(json: string): LogEntity {
    const { level, message, createdAt } = JSON.parse(json);
    const log = new LogEntity(level, message);
    log.createdAt = new Date(createdAt);
    return log;
  }
}
