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
        draft.errors = action.payload.errors;
        break;
      case types.SHOW_LOADING:
        draft.isLoading = true;
        break;
      case types.HIDE_LOADING:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default appReducer;
