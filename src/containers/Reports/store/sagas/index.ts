import { takeLatest, call, put, select } from 'redux-saga/effects';
import moment from 'moment';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { makeSelectProfile } from '@Containers/App/store/selectors';
import { makeSelectTrackers } from '@Containers/Trackers/store/selectors';

function* fetchNotificationUnreadSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { data } = yield call(
      apiServices.fetchNotificationUnread,
      account_id,
      action.query
    );
    const notifications = data.reduce(
      (obj, item) => {
        obj.notifications = { ...obj.notifications, [item.id]: item };
        obj.notificationsIds.push(item.id);
        return obj;
      },
      {
        notifications: {},
        notificationsIds: [],
      }
    );
    yield put(actions.fetchNotficationUnreadSucceed(notifications));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(actions.fetchNotficationUnreadFailed(payload));
  }
}

function* fetchHistoryStopTrackerSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const trackers = yield select(makeSelectTrackers());
    const { trackerId, query } = action.payload.data;
    const { device_name } = trackers[trackerId];

    const { data: historyData } = yield call(
      apiServices.getHistoryStopTracker,
      account_id,
      trackerId,
      query
    );
    if (historyData.length < 1) {
      yield put(
        showSnackbar({
          snackType: 'success',
          snackMessage: 'This tracker not have history in this time',
        })
      );
    }
    let history = [] as any;
    let objAssign = [] as any;

    historyData.forEach(item => {
      const lastItemHistory = history[history.length - 1];
      history.length === 0
        ? history.push(item)
        : lastItemHistory.speed !== item.speed &&
          (lastItemHistory.speed === 0 || item.speed === 0) &&
          history.push(item);
    });

    historyData.forEach(item => {
      const lastItemHistory = history[history.length - 1];
      history.length === 0
        ? history.push(item)
        : lastItemHistory.speed !== item.speed &&
          (lastItemHistory.speed === 0 || item.speed === 0) &&
          history.push(item);
    });

    history.forEach((currentHistory, index) => {
      if (currentHistory.speed === 0 && history[index + 1]) {
        const nextHistory = history[index + 1];
        Object.assign(currentHistory, {
          stopOn: currentHistory.time * 1000,
          startOn: nextHistory.time * 1000,
          duration: moment.duration(nextHistory.time - currentHistory.time),
          device_name,
        });
        objAssign.push(currentHistory);
      }
    });

    const historyStop = objAssign.reduce(
      (obj, item) => {
        obj.historyStops = { ...obj.historyStops, [item.time]: item };
        obj.historyStopIds.push(item.time);
        return obj;
      },
      {
        historyStops: {},
        historyStopIds: [],
      }
    );

    yield put(actions.fetchHistoryRecentStopSucceed(trackerId, historyStop));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(actions.fetchHistoryRecentStopFailed(payload));
  }
}

function* fetchHistoryLogsTrackerSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const trackers = yield select(makeSelectTrackers());
    const { trackerId, query } = action.payload.data;
    const { device_name } = trackers[trackerId];

    const { data: historyData } = yield call(
      apiServices.getHistoryStopTracker,
      account_id,
      trackerId,
      query
    );
    if (historyData.length < 1) {
      yield put(
        showSnackbar({
          snackType: 'success',
          snackMessage: 'This tracker not have history in this time',
        })
      );
    }
    const historyStop = historyData.reduce(
      (obj, item) => {
        obj.historyLogs = { ...obj.historyLogs, [item.time]: item };
        obj.historyLogIds.push(item.time);
        Object.assign(item, {
          device_name,
        });
        return obj;
      },
      {
        historyLogs: {},
        historyLogIds: [],
      }
    );

    yield put(actions.fetchHistoryLogsSucceed(trackerId, historyStop));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(actions.fetchHistoryLogsFailed(payload));
  }
}

function* fetchHistorySpeedSagas(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const trackers = yield select(makeSelectTrackers());
    const { trackerId, query } = action.payload.data;
    const { device_name } = trackers[trackerId];

    const { data: historyData } = yield call(
      apiServices.getHistoryStopTracker,
      account_id,
      trackerId,
      query
    );
    if (historyData.length < 1) {
      yield put(
        showSnackbar({
          snackType: 'success',
          snackMessage: 'This tracker not have history in this time',
        })
      );
    }
    let histories = [] as any;
    let historiesSpeed = [] as any;

    historyData.forEach(item => {
      const lastItemHistory = histories[histories.length - 1];
      histories.length === 0
        ? histories.push(item)
        : lastItemHistory.speed !== item.speed && histories.push(item);
    });
    histories.forEach((currentHistory, index) => {
      if (histories[index + 1]) {
        const nextHistory = histories[index + 1];
        const speedChange = nextHistory.speed - currentHistory.speed;
        Object.assign(currentHistory, {
          speedChange,
          device_name,
        });
        historiesSpeed.push(currentHistory);
      }
    });

    const historySpeeds = historiesSpeed.reduce(
      (obj, item) => {
        obj.historySpeeds = { ...obj.historySpeeds, [item.time]: item };
        obj.historySpeedIds.push(item.time);
        return obj;
      },
      {
        historySpeeds: {},
        historySpeedIds: [],
      }
    );

    yield put(actions.fetchHistorySpeedsSucceed(trackerId, historySpeeds));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(actions.fetchHistorySpeedsFailed(payload));
  }
}

function* fetchHistoryTripSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { trackerId, query } = action.payload.data;

    const { data: historyData } = yield call(
      apiServices.getHistoryStopTracker,
      account_id,
      trackerId,
      query
    );
    if (historyData.length < 1) {
      yield put(
        showSnackbar({
          snackType: 'success',
          snackMessage: 'This tracker not have history in this time',
        })
      );
    }

    const trips = historyData.reduce(
      (obj, curTrip) => {
        if (obj.tripIds.length < 1) {
          obj.trips = {
            ...obj.trips,
            [curTrip.time]: {
              points: { [curTrip.time]: curTrip },
              pointIds: [curTrip.time],
            },
          };
          obj.tripIds.push(curTrip.time);
        } else {
          const prevTrip = obj.trips[obj.tripIds[obj.tripIds.length - 1]];
          const prevPointId = prevTrip.pointIds.length - 1;
          const prevPoint = prevTrip.points[prevTrip.pointIds[prevPointId]];
          const timeDiff = curTrip.time - prevPoint.time;

          if (timeDiff < 300) {
            prevTrip.points = { ...prevTrip.points, [curTrip.time]: curTrip };
            prevTrip.pointIds.push(curTrip.time);
          } else {
            obj.trips = {
              ...obj.trips,
              [curTrip.time]: {
                points: { [curTrip.time]: curTrip },
                pointIds: [curTrip.time],
              },
            };
            obj.tripIds.push(curTrip.time);
          }
        }
        return obj;
      },
      {
        trips: {},
        tripIds: [],
      }
    );

    yield put(actions.fetchHistoryTripSucceed(trips));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(actions.fetchHistoryTripFailed(payload));
  }
}

export default function* reportsWatcher() {
  yield takeLatest(
    types.FETCH_NOTIFICATION_UNREAD_REQUESTED,
    fetchNotificationUnreadSaga
  );
  yield takeLatest(
    types.FETCH_HISTORY_RECENT_STOP_REQUESTED,
    fetchHistoryStopTrackerSaga
  );
  yield takeLatest(
    types.FETCH_HISTORY_LOGS_REQUESTED,
    fetchHistoryLogsTrackerSaga
  );
  yield takeLatest(types.FETCH_HISTORY_SPEED_REQUESTED, fetchHistorySpeedSagas);
  yield takeLatest(types.FETCH_HISTORY_TRIP_REQUESTED, fetchHistoryTripSaga);
}
