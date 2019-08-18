import * as api from './usersList';

const NETWORK_DELAY = 1000;

export const mockFetch = (requestName, ...params) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(api[requestName](...params));
  }, NETWORK_DELAY);
});