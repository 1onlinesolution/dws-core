import { MongoConnection } from '../mongoConnection';

describe('MongoConnection', () => {
  test('ctor', async () => {
    const connectionString = 'my connection string';
    const conn = new MongoConnection(connectionString);
    expect(conn !== null).toBe(true);
    expect(typeof conn === 'object').toBe(true);
    expect(conn instanceof MongoConnection).toBe(true);
    expect(conn.connectionString === connectionString).toBe(true);
    expect(typeof conn.options === 'object').toBe(true);
    expect(conn.options.useUnifiedTopology === true).toBe(true);
  });
});
