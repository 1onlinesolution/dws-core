import * as Sinon from 'sinon';
import { MongoLogger, DefaultMongoOptions } from '../index';

DefaultMongoOptions.level = 'info';
DefaultMongoOptions.db = 'aaa';
DefaultMongoOptions.collection = 'bbb';

describe('MongoLogger', () => {
  test('Default Constructor', function () {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = Sinon.stub(MongoLogger.prototype, 'initialize');

    const logger = new MongoLogger(DefaultMongoOptions);
    expect(logger.label).toBe(DefaultMongoOptions.label);
    expect(logger.level).toBe(DefaultMongoOptions.level);
    expect(logger.usedTransports).not.toBeNull();
    expect(logger.usedTransports.length).toBe(0); // Normally it would be 1, and logger.usedTransports[0].name === 'file', but we use a stub...
    Sinon.assert.calledOnce(initialize);

    initialize.restore();
  });

  test('Constructor', function () {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = Sinon.stub(MongoLogger.prototype, 'initialize');

    DefaultMongoOptions.level = 'error';
    const logger = new MongoLogger(DefaultMongoOptions);
    expect(logger.label).toBe(DefaultMongoOptions.label);
    expect(logger.level).toBe(DefaultMongoOptions.level);
    expect(logger.usedTransports).not.toBeNull();
    expect(logger.usedTransports.length).toBe(0); // Normally it would be 1, and logger.usedTransports[0].name === 'file', but we use a stub...
    Sinon.assert.calledOnce(initialize);

    initialize.restore();
  });

  test('Constructor throws when there is a misconfiguration', () => {
    expect(() => {
      DefaultMongoOptions.level = 'aaa';
      new MongoLogger(DefaultMongoOptions);
    }).toThrow(/invalid configuration/);
  });
});
