export const setStateById = ({
  id = '',
  value = '',
}): {
  type: typeof SET_STATE;
  payload: {
    id: string;
    value: any;
  };
} => {
  return {
    type: SET_STATE,
    payload: {
      id,
      value,
    },
  };
};

export const setMethodById = ({
  id = '',
  value = '',
}): {
  type: typeof SET_METHOD;
  payload: {
    id: string;
    value: any;
  };
} => {
  return {
    type: SET_METHOD,
    payload: {
      id,
      value,
    },
  };
};

export const addState = ({
  id = '',
  name = '',
  initValue = '',
}): {
  type: typeof ADD_STATE;
  payload: {
    id: string;
    name: string;
    initValue: any;
  };
} => {
  return {
    type: ADD_STATE,
    payload: {
      id,
      name,
      initValue,
    },
  };
};

export const addMethod = ({
  id = '',
  name = '',
  method = '',
}): {
  type: typeof ADD_METHOD;
  payload: {
    id: string;
    name: string;
    method: any;
  };
} => {
  return {
    type: ADD_METHOD,
    payload: {
      id,
      name,
      method,
    },
  };
};

export const deleteState = ({
  id = '',
}): {
  type: typeof DELETE_STATE;
  payload: {
    id: string;
  };
} => {
  return {
    type: DELETE_STATE,
    payload: {
      id,
    },
  };
};

export const deleteMethod = ({
  id = '',
}): {
  type: typeof DELETE_METHOD;
  payload: {
    id: string;
  };
} => {
  return {
    type: DELETE_METHOD,
    payload: {
      id,
    },
  };
};

export const SET_STATE = 'setState';
export const SET_METHOD = 'setMethod';
export const ADD_STATE = 'addState';
export const ADD_METHOD = 'addMethod';
export const DELETE_STATE = 'deleteState';
export const DELETE_METHOD = 'deleteMethod';
