// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: 'mocked Three',
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    expect(mockOne()).toBe(undefined);
    expect(mockTwo()).toBe(undefined);
    expect(mockThree).toBe('mocked Three');
  });

  test('unmockedFunction should log into console', () => {
    console.log = jest.fn();
    unmockedFunction();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
    expect(console.log).toHaveBeenCalledTimes(1);
    jest.restoreAllMocks();
  });
});
