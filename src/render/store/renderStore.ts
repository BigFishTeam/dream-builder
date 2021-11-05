import { createStore } from 'redux';
import reducer from './renderReducer';

const initStore = {
  states: [],
  methods: [],
};

export default createStore(reducer, initStore as any);
