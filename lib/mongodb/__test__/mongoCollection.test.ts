import { MongoCollection } from '../mongoCollection';
import { MongoDatabase } from '../mongoDatabase';

describe('MongoCollection', () => {
  test('ctor', async () => {
    const connectionString = 'my connection string';
    const dbName = 'my database';
    const collName = 'my collection';
    const database = new MongoDatabase(connectionString, dbName);
    const collection = new MongoCollection(database, collName);
    expect(collection).not.toBeNull();
    expect(typeof collection).toBe('object');
    expect(collection instanceof MongoCollection).toBe(true);
    expect(collection.database).not.toBeNull();
    expect(collection.name).toBe(collName);
  });
});
