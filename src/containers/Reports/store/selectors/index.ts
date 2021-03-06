import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const reportState = (state: any) => state.reports || initialState;

const makeSelectNotifications = () =>
  createSelector(reportState, state => state?.notifications.notifications);

const makeSelectNotificationsIds = () =>
  createSelector(reportState, state => state?.notifications.notificationsIds);

const makeSelectViewMode = () =>
  createSelector(reportState, state => state?.viewMode);

const makeSelecteFetchingDataNoti = () =>
  createSelector(reportState, state => state?.isFetchingDataNoti);

const makeSelecteFetchingDataStop = () =>
  createSelector(reportState, state => state?.isFetchingDataStop);

const makeSelectHistoryStops = () =>
  createSelector(reportState, state => state?.historyStop.historyStops);

const makeSelectHistoryStopIds = () =>
  createSelector(reportState, state => state?.historyStop.historyStopIds);

const makeSelectHistoryLogs = () =>
  createSelector(reportState, state => state?.historyLogs.historyLogs);

const makeSelectHistoryLogIds = () =>
  createSelector(reportState, state => state?.historyLogs.historyLogIds);

const makeSelectFetchingHistoryLogs = () =>
  createSelector(reportState, state => state?.isFetchingHistoryLogs);

const makeSelectHistorySpeeds = () =>
  createSelector(reportState, state => state?.historySpeeds.historySpeeds);

const makeSelectHistorySpeedIds = () =>
  createSelector(reportState, state => state?.historySpeeds.historySpeedIds);

const makeSelectFetchingHistorySpeeds = () =>
  createSelector(reportState, state => state?.isFetchHistorySpeed);

const makeSelectHistoryTripIds = () =>
  createSelector(reportState, state => state?.trips?.tripIds);

const makeSelectHistoryTrips = () =>
  createSelector(reportState, state => state?.trips?.trips);

const makeSelectFetchingHistoryTrips = () =>
  createSelector(reportState, state => state?.isFetchingTrips);

const makeSelectTripPointsSelected = () =>
  createSelector(reportState, state => state?.trips?.selectPoints);

const makeSelectTripPointIdsSelected = () =>
  createSelector(reportState, state => state?.trips?.selectPointIds);

const makeSelectTripSteps = () =>
  createSelector(reportState, state => state?.trips?.steps);

const makeSelectTripOptimized = () =>
  createSelector(reportState, state => state?.trips?.coordinateOptimized);

const makeSelectTripModeMapView = () =>
  createSelector(reportState, state => state?.trips?.modeMap);

export {
  makeSelectNotifications,
  makeSelectNotificationsIds,
  makeSelectViewMode,
  makeSelecteFetchingDataNoti,
  makeSelecteFetchingDataStop,
  makeSelectHistoryStops,
  makeSelectHistoryStopIds,
  makeSelectHistoryLogs,
  makeSelectHistoryLogIds,
  makeSelectFetchingHistoryLogs,
  makeSelectHistorySpeeds,
  makeSelectHistorySpeedIds,
  makeSelectFetchingHistorySpeeds,
  makeSelectHistoryTripIds,
  makeSelectHistoryTrips,
  makeSelectFetchingHistoryTrips,
  makeSelectTripPointsSelected,
  makeSelectTripPointIdsSelected,
  makeSelectTripSteps,
  makeSelectTripOptimized,
  makeSelectTripModeMapView,
};
