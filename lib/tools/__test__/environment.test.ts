import { Environment } from '../environment';

describe('Environment', () => {
  test('getVariable does not throw if variable not defined and "exitIfUndefined" is set to false', () => {
    expect(Environment.getVariable('Variable', false)).toBe(undefined);
  });

  test('getVariable does not throw if variable not defined and "exitIfUndefined" is set to false', () => {
    expect(Environment.getVariable('Variable', false)).toBe(undefined);
    expect(() => {
      Environment.getVariable('hello world');
    }).toThrowError('[APP ERROR] Missing env variable: hello world');
  });
});
