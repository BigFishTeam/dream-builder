import { get, post } from './api';

export const login = (options: any) => {
  return post('user/login', options);
};

export const register = (options: any) => {
  return post('user/register', options);
};

export const getProject = () => {
  return get('/project', {});
};

export const getProjectSchema = () => {};

export const generateProject = () => {};
