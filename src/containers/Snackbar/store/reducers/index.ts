import produce from 'immer';

import * as types from '../constants';

export const initialState: types.SNACK_TYPES = {
  show: false,
  snackType: 'success',
  snackMessage: '',
};

const uiReducer = (
  state = initialState,
  { type, payload }: types.SNACK_ACTION
) =>
  produce(state, (draft: types.SNACK_TYPES) => {
    switch (type) {
      case types.SHOW_SNACKBAR:
        draft.show = true;
        draft.snackType = payload.snackType;
        draft.snackMessage = payload.snackMessage;
        break;
      case types.CLEAR_SNACKBAR:
        draft.show = false;
        draft.snackType = 'success';
        draft.snackMessage = '';
        break;
      default:
        break;
    }
  });

export default uiReducer;
