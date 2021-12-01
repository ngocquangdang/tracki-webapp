import produce from 'immer';

import { ActionType } from '@Interfaces/index';
import * as types from '../constants';

export const initialState = {
  isLoading: false,
  notifications: {},
  notificationsIds: [],
  errors: null,
};

const trackingReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.FETCH_NOTIFICATION_REQUESTED:
        draft.isLoading = true;
        break;
      case types.FETCH_NOTIFICATION_SUCCEED:
        draft.isLoading = false;
        draft.notifications = payload.notifications.notifications;
        draft.notificationsIds = payload.notifications.notificationsIds;
        draft.errors = null;
        break;
      case types.FETCH_NOTIFICATION_FAILED:
        draft.isLoading = false;
        draft.errors = payload.errors;
        break;
      default:
        break;
    }
  });

export default trackingReducer;
