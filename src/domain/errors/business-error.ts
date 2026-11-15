export class BusinessError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
