// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 1, action: Action.Subtract });
    expect(result).toBe(7);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 7, b: -8, action: Action.Multiply });
    expect(result).toBe(-56);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 54, b: 6, action: Action.Divide });
    expect(result).toBe(9);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 9,
      action: Action.Exponentiate,
    });
    expect(result).toBe(512);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 4, b: 3, action: 'concat' });
    expect(result).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '5',
      b: '9',
      action: Action.Subtract,
    });
    expect(result).toBeNull;
  });
});
