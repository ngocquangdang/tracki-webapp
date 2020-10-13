import produce from 'immer';

import { ActionType } from '@Interfaces/index';
import * as types from '../constants';

export const initialState = {
  notifications: {},
  notificationsIds: [],
  errors: null,
};

const trackingReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.FETCH_NOTIFICATION_SUCCEED:
        draft.notifications = payload.notifications.notifications;
        draft.notificationsIds = payload.notifications.notificationsIds;
        draft.errors = null;
        break;
      case types.FETCH_NOTIFICATION_FAILED:
        draft.errors = payload.errors;
        break;
      default:
        break;
    }
  });

export default trackingReducer;
