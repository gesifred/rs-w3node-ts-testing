// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const myCallBack: () => void = () => {
      /*do nothing*/
    };
    doStuffByTimeout(myCallBack, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 100);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const myCallBack: () => void = () => {
      /*do nothing*/
    };
    doStuffByInterval(myCallBack, 1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 100);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(515);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    const fileName = 'test-file.txt';
    await readFileAsynchronously(fileName);
    expect(join).toHaveBeenCalledTimes(1);
    expect(join).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    const existsSync = jest.spyOn(fs, 'existsSync');
    const fileName = 'test-non-existent-file.txt';
    await readFileAsynchronously(fileName);
    expect(existsSync).toHaveBeenCalledTimes(1);
    expect(existsSync).toHaveBeenCalledWith(path.join(__dirname, fileName));
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const fileName = 'somePath.txt';
    const mockedFileContent = 'this is my content';
    const existsSync = jest.spyOn(fs, 'existsSync');
    const readfile = jest.spyOn(fsPromises, 'readFile');
    readfile.mockReturnValue(Promise.resolve(mockedFileContent));
    existsSync.mockReturnValue(true);
    await expect(readFileAsynchronously(fileName)).resolves.toBe(
      mockedFileContent,
    );
  });
});
