/**
 * axios请求封装
 */

import axios from 'axios';

axios.defaults.timeout = 60000;

// 请求拦截器
axios.interceptors.request.use((request: any) => {
  return request;
});

// 响应拦截器
axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: Error) => {
    Promise.reject(error);
  }
);
