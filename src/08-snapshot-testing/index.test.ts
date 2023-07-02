// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const linkedList = generateLinkedList(['a', 'b']);
    expect(linkedList).toMatchSnapshot(); //snapshot should be committed
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const linkedList = generateLinkedList([
      [1, 2],
      [3, 4],
    ]);
    expect(linkedList).toMatchSnapshot();
  });
});
