// https://javascript.info/custom-errors

class MailServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MailServerError';
  }
}

export { MailServerError };
