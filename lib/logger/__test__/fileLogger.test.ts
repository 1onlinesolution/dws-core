import * as Sinon from 'sinon';
import { FileLogger, DefaultFileOptions } from '../index';
import { BaseLogger } from '../baseLogger';

describe('FileLogger', () => {
  test('Default Constructor', function () {
    const initialize = Sinon.stub(FileLogger.prototype, 'initialize');

    DefaultFileOptions.level = BaseLogger.DefaultLevel();
    const logger = new FileLogger(DefaultFileOptions);
    expect(logger.label).toBe(DefaultFileOptions.label);
    expect(logger.level).toBe(DefaultFileOptions.level);
    expect(logger.usedTransports).not.toBeNull();
    expect(logger.usedTransports.length).toBe(0); // Normally it would be 1, and logger.usedTransports[0].name === 'file', but we use a stub...

    Sinon.assert.calledOnce(initialize);

    initialize.restore();
  });

  test('Constructor', function () {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = Sinon.stub(FileLogger.prototype, 'initialize');

    DefaultFileOptions.level = 'error';
    const logger = new FileLogger(DefaultFileOptions);
    expect(logger.label).toBe(DefaultFileOptions.label);
    expect(logger.level).toBe(DefaultFileOptions.level);
    expect(logger.usedTransports).not.toBeNull();
    expect(logger.usedTransports.length).toBe(0); // Normally it would be 1, and logger.usedTransports[0].name === 'file', but we use a stub...

    Sinon.assert.calledOnce(initialize);

    initialize.restore();
  });

  test('Constructor throws when there is a misconfiguration', () => {
    expect(() => {
      DefaultFileOptions.filename = '';
      new FileLogger(DefaultFileOptions);
    }).toThrow(/invalid configuration/);
  });

  test('info', function () {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = Sinon.stub(FileLogger.prototype, 'initialize');
    const info = Sinon.stub(BaseLogger.prototype, 'info');

    DefaultFileOptions.level = 'info';
    const logger = new FileLogger(DefaultFileOptions);
    logger.info('Hello');

    Sinon.assert.calledOnce(initialize);
    Sinon.assert.calledOnce(info);

    initialize.restore();
    info.restore();
  });

  test('warn', function () {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = Sinon.stub(FileLogger.prototype, 'initialize');
    const warn = Sinon.stub(BaseLogger.prototype, 'warn');

    DefaultFileOptions.level = 'warn';
    const logger = new FileLogger(DefaultFileOptions);
    logger.warn('Hello');

    Sinon.assert.calledOnce(initialize);
    Sinon.assert.calledOnce(warn);

    initialize.restore();
    warn.restore();
  });

  test('error', function () {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = Sinon.stub(FileLogger.prototype, 'initialize');
    const error = Sinon.stub(BaseLogger.prototype, 'error');

    DefaultFileOptions.level = 'error';
    const logger = new FileLogger(DefaultFileOptions);
    logger.error('Hello');

    Sinon.assert.calledOnce(initialize);
    Sinon.assert.calledOnce(error);

    initialize.restore();
    error.restore();
  });
});
