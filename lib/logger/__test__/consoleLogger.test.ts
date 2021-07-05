import { BaseLogger, ConsoleLogger, DefaultConsoleOptions } from '../index';

describe('ConsoleLogger', () => {
  test('Default Constructor', function() {
    DefaultConsoleOptions.level = BaseLogger.DefaultLevel();
    const logger = new ConsoleLogger(DefaultConsoleOptions);
    expect(logger.label).toBe(DefaultConsoleOptions.label);
    expect(logger.level).toBe(DefaultConsoleOptions.level);
    expect(logger.usedTransports).not.toBeNull();
    expect(logger.usedTransports.length).toBe(1);
  });

  test('Constructor', function() {
    DefaultConsoleOptions.level = 'warn';
    const logger = new ConsoleLogger(DefaultConsoleOptions);
    expect(logger.label).toBe(DefaultConsoleOptions.label);
    expect(logger.level).toBe(DefaultConsoleOptions.level);
    expect(logger.usedTransports).not.toBeNull();
    expect(logger.usedTransports.length).toBe(1);
  });

  test('Constructor throws when there is a misconfiguration', () => {
    expect(() => {
      DefaultConsoleOptions.level = 'aaa';
      new ConsoleLogger(DefaultConsoleOptions);
    }).toThrow(/invalid configuration/);
  });

});