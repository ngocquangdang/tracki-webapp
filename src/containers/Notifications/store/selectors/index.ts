import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const notificationsState = (state: any) => state.notifications || initialState;

const makeSelectNotifications = () =>
  createSelector(notificationsState, state => state?.notifications);
const makeSelectNotificationsIds = () =>
  createSelector(notificationsState, state => state?.notificationsIds);

export { makeSelectNotifications, makeSelectNotificationsIds };
