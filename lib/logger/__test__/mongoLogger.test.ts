import * as Sinon from 'sinon';
import { MongoLogger, DefaultMongoOptions } from '../index';

DefaultMongoOptions.level = 'info';
DefaultMongoOptions.db = 'aaa';
DefaultMongoOptions.collection = 'bbb';

describe('MongoLogger', () => {
  test('Default constructor', function () {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = Sinon.stub(MongoLogger.prototype, 'initialize');

    const logger = new MongoLogger('my label', 'info', DefaultMongoOptions);
    expect(logger.label).toBe('my label');
    expect(logger.level).toBe('info');
    expect(logger.usedTransports).not.toBeNull();
    expect(logger.usedTransports.length).toBe(0); // Normally it would be 1, and logger.usedTransports[0].name === 'file', but we use a stub...
    Sinon.assert.calledOnce(initialize);

    initialize.restore();
  });

  test('Constructor throws when there is a misconfiguration', () => {
    expect(() => {
      DefaultMongoOptions.level = 'aaa';
      new MongoLogger('my label', 'info', DefaultMongoOptions);
    }).toThrow(/invalid configuration/);
  });
});
