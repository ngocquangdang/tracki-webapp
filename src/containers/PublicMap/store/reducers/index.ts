import produce from 'immer';
import { ActionType } from '@Interfaces';
import * as types from '../constants';

export const initialState = {
  tracker: {},
  isRequesting: false,
  error: {},
};

const PublicMapReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
  produce(state, draft => {
    switch (type) {
      case types.GET_DEVICE_BY_TOKEN_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.GET_DEVICE_BY_TOKEN_SUCCESSED:
        draft.tracker = payload.device;
        draft.isRequesting = false;
        draft.error = {};
        break;
      case types.GET_DEVICE_BY_TOKEN_FAILED:
        draft.error = payload.error;
        break;
      default:
        break;
    }
  });

export default PublicMapReducer;
