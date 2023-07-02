// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, /*THROTTLE_TIME*/ } from './index';
//import _ from 'lodash';
describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    const base= 'https://jsonplaceholder.typicode.com';
    const axiosInstance = jest.spyOn(axios, 'create');
    jest.spyOn(axios,'get').mockResolvedValue({data:"apiData"});
    await throttledGetDataFromApi('/');
    jest.advanceTimersByTime(3000);
    expect(axiosInstance).toBeCalled();
    expect(axiosInstance).toHaveBeenCalledWith({
      baseURL: base,
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosInstance = jest.spyOn(axios, 'create');
    const axiosGet = jest.spyOn(axios.Axios.prototype,'get').mockImplementation(() => Promise.resolve({data:"apiData"}));//.mockResolvedValue({data:"apiData"});
    //axios.get = jest.fn().mockResolvedValue('api');
    await throttledGetDataFromApi('api');
    jest.runAllTimers();
    expect(axiosInstance).toBeCalled();
    expect(axiosGet).toHaveBeenCalledWith('api');
    jest.useRealTimers();
  });

  test('should return response data', async () => {
    jest.restoreAllMocks();
    jest.useFakeTimers();
    const axiosGet = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGet.mockResolvedValue({ data: 'retruned' });
    const mockedResponse = await throttledGetDataFromApi('api');
    jest.runAllTimers();
    expect(mockedResponse).toBe('retruned');
    expect(axiosGet).toHaveBeenCalledWith('api');
    jest.useRealTimers();
  });
});
