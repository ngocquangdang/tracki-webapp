import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const notificationsState = (state: any) => state.notifications || initialState;

const makeSelectNotifications = () =>
  createSelector(notificationsState, state => state.notifications);

export { makeSelectNotifications };
