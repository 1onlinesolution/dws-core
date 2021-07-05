import { ConsoleLogger, DefaultConsoleOptions } from '../index';

DefaultConsoleOptions.level = 'info';

describe('ConsoleLogger', () => {
  test('Default constructor', function() {
    const logger = new ConsoleLogger('my label', 'info', DefaultConsoleOptions);
    expect(logger.label).toBe('my label');
    expect(logger.level).toBe('info');
    expect(logger.usedTransports).not.toBeNull();
    expect(logger.usedTransports.length).toBe(1);
  });

  test('Constructor throws when there is a misconfiguration', () => {
    expect(() => {
      DefaultConsoleOptions.level = 'aaa';
      new ConsoleLogger('my label', 'info', DefaultConsoleOptions);
    }).toThrow(/invalid configuration/);
  });

});