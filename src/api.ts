import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const get = (path: string, options: any) => {
  return axios.get(`${baseUrl}/${path}`, options);
};

export const post = (path: string, options: any) => {
  return axios.post(`${baseUrl}/${path}`, options);
};
