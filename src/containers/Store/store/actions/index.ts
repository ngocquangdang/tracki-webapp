import * as types from '../constants';

export const changeStoreView = (viewMode: string) => ({
  type: types.CHANGE_STORE_VIEW,
  payload: { viewMode },
});
