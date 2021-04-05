export const actionShopping = {
  ADD: "ADD",
  CLEAR: "CLEAR",
  FETCH: "FETCH",
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  REMOVE: "REMOVE",
  GET: "GET",
};

export const addShopping = (product) => (dispatch) => {
  return dispatch({
    type: actionShopping.ADD,
    payload: {
      product: product,
      quantity: 1,
    },
  });
};

export const fetchShopping = () => (dispatch) => {
  return dispatch({
    type: actionShopping.FETCH,
  });
};

export const getShopping = () => (dispatch) => {
  return dispatch({
    type: actionShopping.GET,
  });
};

export const clearShopping = () => (dispatch) => {
  return dispatch({
    type: actionShopping.CLEAR,
  });
};

export const remove = (product) => (dispatch) => {
  return dispatch({
    type: actionShopping.REMOVE,
    payload: {
      product,
    },
  });
};

export const increment = (product) => (dispatch) => {
  return dispatch({
    type: actionShopping.INCREMENT,
    payload: {
      product,
    },
  });
};

export const decrement = (product) => (dispatch) => {
  return dispatch({
    type: actionShopping.DECREMENT,
    payload: {
      product,
    },
  });
};
