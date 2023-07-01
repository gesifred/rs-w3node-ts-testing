// Uncomment the code below and write your tests
import { BankAccount, getBankAccount } from '.';
import _ from 'lodash';

describe('BankAccount', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  })

  test('should create account with initial balance', () => {
    const initBalance = 1000;
    const bankAcc = new BankAccount(initBalance);
    expect(bankAcc.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initBalance = 100;
    const bankAcc = getBankAccount(initBalance);
    expect(() => { bankAcc.withdraw(150) }).toThrow(`Insufficient funds: cannot withdraw more than ${initBalance}`)
  });

  test('should throw error when transferring more than balance', () => {
    const initBalance = 100;
    const account1 = getBankAccount(initBalance);
    const account2 = getBankAccount(initBalance);
    expect(() => { account1.transfer(200, account2) }).toThrow(`Insufficient funds: cannot withdraw more than ${initBalance}`);
  });

  test('should throw error when transferring to the same account', () => {
    const initBalance = 100;
    const account1 = getBankAccount(initBalance);
    expect(() => { account1.transfer(50, account1) }).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const initBalance = 100;
    const account1 = getBankAccount(initBalance);
    expect(account1.deposit(300).getBalance()).toBe(account1.getBalance());
  });

  test('should withdraw money', () => {
    const initBalance = 100;
    const account1 = getBankAccount(initBalance);
    expect(account1.withdraw(50).getBalance()).toBe(account1.getBalance());
  });

  test('should transfer money', () => {
    const initBalance = 100;
    const account1 = getBankAccount(initBalance);
    const account2 = getBankAccount(initBalance);
    expect(account1.transfer(50, account2).getBalance()).toBe(account1.getBalance());
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = new BankAccount(0);
    const spy = jest.spyOn(_, 'random').mockReturnValue(1);
    await bankAccount.fetchBalance();
    expect(spy).toBeCalledTimes(2);
    expect(bankAccount.getBalance()).toBeLessThanOrEqual(100);
    //spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = new BankAccount(1500);
    const spy = jest.spyOn(_, 'random').mockReturnValueOnce(50);
    jest.spyOn(_, 'random').mockReturnValueOnce(1);
    await bankAccount.synchronizeBalance();
    expect(spy).toBeCalledTimes(2);
    expect(bankAccount.getBalance()).toBeLessThan(1500);
    expect(bankAccount.getBalance()).toBe(50);
    //spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = new BankAccount(0);
    const spy = jest.spyOn(_, 'random').mockReturnValue(0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(`Synchronization failed`)
    expect(spy).toBeCalledTimes(2);
    //spy.mockRestore();
  });
});
