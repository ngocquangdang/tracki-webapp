import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const notificationsState = (state: any) => state.notifications || initialState;

const makeSelectNotifications = () =>
  createSelector(notificationsState, state => state?.notifications);
const makeSelectNotificationsIds = () =>
  createSelector(notificationsState, state => state?.notificationsIds);
const makeSelectNotificationsIsLoading = () =>
  createSelector(notificationsState, state => state?.isLoading);

export {
  makeSelectNotifications,
  makeSelectNotificationsIds,
  makeSelectNotificationsIsLoading,
};
