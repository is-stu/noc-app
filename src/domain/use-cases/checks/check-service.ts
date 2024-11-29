import { LogEntity, LogSererityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface checkServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type onSuccess = () => void;
type onError = (error: string) => void;

export class CheckService implements checkServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly onSuccess: onSuccess,
    private readonly onError: onError
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      this.logRepository.saveLog(
        new LogEntity(LogSererityLevel.LOW, `${url} is ok`)
      );
      this.onSuccess();
      return true;
    } catch (error) {
      this.logRepository.saveLog(
        new LogEntity(LogSererityLevel.HIGH, `url ${url} is not ok + ${error}`)
      );
      this.onError(`${error}`);
      return false;
    }
  }
}
