import { MongoDatabase } from '../mongoDatabase';

describe('MongoDatabase', () => {
  test('ctor', async () => {
    const connectionString = 'my connection string';
    const dbName = 'my database';
    const database = new MongoDatabase(connectionString, dbName);
    expect(database).not.toBeNull();
    expect(typeof database).toBe('object');
    expect(database instanceof MongoDatabase).toBe(true);
    expect(database.connectionString).toBe(connectionString);
    expect(database.name).toBe(dbName);
  });
});
