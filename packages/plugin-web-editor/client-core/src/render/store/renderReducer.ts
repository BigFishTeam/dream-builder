import { combineReducers } from 'redux';
import { SET_METHOD, SET_STATE, ADD_METHOD, ADD_STATE, DELETE_METHOD, DELETE_STATE } from './renderAction';
import { produce } from 'immer';

type StateReducerAction =
  | {
      type: typeof SET_STATE;
      payload: {
        id: string;
        value: any;
      };
    }
  | {
      type: typeof ADD_STATE;
      payload: {
        id: string;
        name: string;
        initValue: any;
      };
    }
  | {
      type: typeof DELETE_STATE;
      payload: {
        id: string;
      };
    };

type MethodReducerAction =
  | {
      type: typeof SET_METHOD;
      payload: {
        id: string;
        value: any;
      };
    }
  | {
      type: typeof ADD_METHOD;
      payload: {
        id: string;
        name: string;
        method: any;
      };
    }
  | {
      type: typeof DELETE_METHOD;
      payload: {
        id: string;
      };
    };

type StateType = {
  id: string;
  name: string;
  value: any;
};

type MethodType = {
  id: string;
  name: string;
  method: any;
};

const stateReducer = function(
  state: {
    states: StateType[];
  } = {
    states: [],
  },
  action: StateReducerAction,
) {
  switch (action.type) {
    case 'addState':
      return produce(state, draft => {
        const { id, name, initValue } = action.payload;
        const option = {
          id,
          name,
          value: initValue,
        };
        const oldStateIndex = draft.states.findIndex(ele => ele.id === id);
        if (oldStateIndex === -1) {
          draft.states.push(option);
        } else {
          draft.states.splice(oldStateIndex, 1, option);
        }
        return draft;
      });
    case 'setState':
      return produce(state, draft => {
        const filtedState = draft.states.filter(state => state.id === action.payload.id);
        if (filtedState.length > 0) {
          filtedState[0].value = action.payload.value;
        }
        return draft;
      });
    case 'deleteState':
      return produce(state, draft => {
        const filtedState = draft.states.filter(state => state.id === action.payload.id);
        if (filtedState.length > 0) {
          const idx = draft.states.indexOf(filtedState[0]);
          draft.states.splice(idx, 1);
        }
        return draft;
      });
    default:
      return state;
  }
};

const methodReducer = function(
  state: {
    methods: MethodType[];
  } = {
    methods: [],
  },
  action: MethodReducerAction,
) {
  switch (action.type) {
    case 'addMethod':
      return produce(state, draft => {
        const oldMethodIndex = draft.methods.findIndex(method => method.id === action.payload.id);
        if (oldMethodIndex === -1) {
          draft.methods.push(action.payload);
        } else {
          draft.methods.splice(1, oldMethodIndex, action.payload);
        }
      });
    case 'setMethod':
      return produce(state, draft => {
        const filtedMethod = draft.methods.find(method => method.id === action.payload.id);
        if (filtedMethod) {
          filtedMethod.method = action.payload.value;
        }
        return draft;
      });
    case 'deleteMethod':
      return produce(state, draft => {
        const filtedMethodIdx = draft.methods.findIndex(method => method.id === action.payload.id);
        if (filtedMethodIdx) {
          draft.methods.splice(filtedMethodIdx, 1);
        }
        return draft;
      });
    default:
      return state;
  }
};

export default combineReducers({
  stateReducer,
  methodReducer,
});
