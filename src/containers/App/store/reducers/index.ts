import produce from 'immer';
import * as types from '../definitions';

export const initialState: any = {
  isLoading: false,
  profile: null,
  errors: {},
};

const appReducer = (state = initialState, action: any) =>
  produce(state, (draft: any) => {
    switch (action.type) {
      case types.GET_PROFILE_SUCCEED: {
        draft.errors = {};
        draft.profile = action.profile;
        break;
      }
      case types.GET_PROFILE_FAILED:
        draft.errors = action.errors;
        break;
      case types.PAGE_LOADING_PROGRESS_CHANGE: {
        draft.isLoading = action.payload.status;
        break;
      }
      default:
        break;
    }
  });

export default appReducer;
