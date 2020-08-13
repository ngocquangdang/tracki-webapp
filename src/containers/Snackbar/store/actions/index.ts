import * as types from '../constants';

export const showSnackbar = (payload: types.SNACK_PAYLOAD) => ({
  type: types.SHOW_SNACKBAR,
  payload,
});

export const clearSnackbar = () => ({ type: types.CLEAR_SNACKBAR });
