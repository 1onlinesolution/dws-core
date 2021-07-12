import { DatabaseConnectionError } from '../databaseConnectionError';

describe('DatabaseConnectionError', () => {
  test('Default Constructor', () => {
    const error = new DatabaseConnectionError();
    expect(error instanceof Error).toBeTruthy();
    expect(error.name).toBe('DatabaseConnectionError');
    expect(error.message).toBe('Error connecting to database');
  });

});