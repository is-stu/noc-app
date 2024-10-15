interface checkServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type onSuccess = () => void;
type onError = (error: string) => void;

export class CheckService implements checkServiceUseCase {
  constructor(
    private readonly onSuccess: onSuccess,
    private readonly onError: onError
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      this.onSuccess();
      return true;
    } catch (error) {
      this.onError(`${error}`);
      return false;
    }
  }
}
