// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 8, b: 1, action: Action.Subtract, expected: 7 },
  { a: 7, b: -8, action: Action.Multiply, expected: -56 },
  { a: 54, b: 6, action: Action.Divide, expected: 9 },
  { a: 2, b: 9, action: Action.Exponentiate, expected: 512 },
  { a: 3, b: -3, action: 'concat', expected: null },
  { a: 1, b: '0', action: Action.Divide, expected: null },
];

describe.each(testCases)(
  'simpleCalculator Operations',
  ({ a, b, action, expected }) => {
    test('should add two numbers', () => {
      // Write your test here
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });

    test('should subtract two numbers', () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });

    test('should multiply two numbers', () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });

    test('should divide two numbers', () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });

    test('should exponentiate two numbers', () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });

    test('should return null for invalid action', () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });

    test('should return null for invalid argument', () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  },
);
