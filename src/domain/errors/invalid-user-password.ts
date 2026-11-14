export class InvalidUserPassword extends Error {
  constructor(message: string) {
    super(message);
  }
}
