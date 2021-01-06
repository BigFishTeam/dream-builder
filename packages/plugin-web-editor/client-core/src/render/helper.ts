/** @format */

import _ from 'lodash';
import store from './store/renderStore';
import { isProd } from '../common/utils/prod';
import AjaxClient from '../core/request';
import eventManager from '../eventManager';

interface injectMethodType {
  getState: (id: string) => any;
  setState: (id: string, value: any) => any;
  ajax: any;
}

const wrapMethod = (method: MethodType, { getState, setState, ajax }: injectMethodType) => {
  return `
        (() => {
          function temp(...args) {
            (${method.code})(...args)
          }
          listen('method:${method.id}', temp);
          return temp
        })()
    `;
};

const Ajax = {
  client: AjaxClient,
  isProd: isProd(),
};

interface MethodType {
  code: string;
  id: string;
}

export const injectMethod = (method: MethodType, changeState: (id: string, value: any) => any) => {
  const { getState, dispatch } = store;
  const setState = changeState;
  const state = null;
  const ajax = Ajax;
  const compiledMethod = compileMethod(method, {
    getState: (id: string) => getState().stateReducer.states.find(state => state.id === id),
    setState,
    ajax,
  });

  return compiledMethod;
};

export const pageJump = () => {};

export const injectStyleClass = (styleClass: string) => {
  const body = document.getElementsByTagName('body')[0];
  const style = document.createElement('style');
  style.innerHTML = styleClass;
  body.appendChild(style);
};

export const compileMethod = (method: MethodType, { getState, setState, ajax }: injectMethodType) => {
  const _method = wrapMethod(method, {
    getState,
    setState,
    ajax,
  });
  const listen = eventManager.listen;
  const emit = eventManager.emit;
  try {
    return eval(_method);
  } catch (e) {
    console.error('Error: method error', e);
    return () => {};
  }
};
