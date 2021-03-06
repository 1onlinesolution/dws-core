import { RequestValidationError } from '../requestValidationError';

describe('RequestValidationError', () => {
  test('Constructor', () => {
    const error = new RequestValidationError([]);
    expect(error instanceof Error).toBeTruthy();
    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Invalid request parameters');
    expect(error.errors).not.toBeNull();
    expect(error.errors).toStrictEqual([]);
  });
});