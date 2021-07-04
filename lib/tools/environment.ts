import colors from 'colors/safe';

export class Environment {
  static getVariable(key: string, exitIfUndefined = true): string | undefined {
    const value = process.env[key.toString()];

    if (typeof value !== 'undefined' || !exitIfUndefined) {
      return value;
    }

    // callback error asynchronously
    process.nextTick(function () {
      // eslint-disable-next-line no-console
      console.error(`${colors.red('[APP ERROR] Missing env variable:')} ${colors.green(key)}`);
      throw new Error(`[APP ERROR] Missing env variable: ${key}`);
    });
    // return process.exit(1);
  }
}
