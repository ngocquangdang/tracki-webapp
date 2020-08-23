import * as types from '../constants';

export const fetchNotficationRequest = data => ({
  type: types.FETCH_NOTIFICATION_REQUESTED,
  payload: { data },
});

export const fetchNotficationSucceed = (notifications: object) => ({
  type: types.FETCH_NOTIFICATION_SUCCEED,
  payload: { notifications },
});

export const fetchNotficationFailed = (errors: object) => ({
  type: types.FETCH_NOTIFICATION_FAILED,
  payload: { errors },
});
