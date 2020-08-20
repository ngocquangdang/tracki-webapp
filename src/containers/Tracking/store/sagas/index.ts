import { takeLatest, call, put, select } from 'redux-saga/effects';

import { makeSelectTrackers } from '@Containers/Trackers/store/selectors';
import { changeTrackersTracking } from '../actions';
import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { makeSelectProfile } from '@Containers/App/store/selectors';
import { showSnackbar } from '@Containers/Snackbar/store/actions';

function* changeTrackingViewSaga(action) {
  const { viewMode } = action.payload;
  const isMultiView = ['multi_screen', 'multi_view'].includes(viewMode);

  if (isMultiView) {
    const isMultiScreen = viewMode === 'multi_screen';
    const trackers = yield select(makeSelectTrackers());
    const trackerIds = Object.keys(trackers)
      .filter((id, index) => index < 4)
      .map(id => +id);
    yield put(
      changeTrackersTracking(isMultiScreen ? trackerIds : [trackerIds[0]])
    );
  }
}

function* getHistoryTrackerSaga(action) {
  console.log('function*getHistoryTrackerSaga -> action', action);
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { data: historyData } = yield call(
      apiServices.getHistoryTracker,
      account_id,
      action.payload.data.trackerId,
      action.payload.data.fromDate,
      action.payload.data.toDate,
      action.payload.data.limit,
      action.payload.data.page,
      action.payload.data.type
    );
    if (historyData === []) {
      yield put(
        showSnackbar({
          snackType: 'success',
          snackMessage: 'This tracker not have history in this time',
        })
      );
    }
    // const histories = historyData.reduce((result, item) => {
    //   result.push([item]);
    //   return result;
    // }, []);

    const histories = historyData.reduce(
      (obj, item) => {
        obj.histories = { ...obj.histories, [item.time]: item };
        obj.historieIds.push(item.time);
        return obj;
      },
      {
        histories: {},
        historieIds: [],
      }
    );

    yield put(
      actions.getHistoryTrackerSucceed({
        trackerId: action.payload.data.trackerId,
        histories,
      })
    );
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
    yield put(actions.getHistoryTrackerFailed(payload));
  }
}

function* getAlarmTrackerSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { data: historyData } = yield call(
      apiServices.getAlarmTracker,
      account_id,
      action.payload.data.trackerId,
      action.payload.data.limit,
      action.payload.data.page,
      action.payload.data.type
    );
    if (historyData === []) {
      yield put(
        showSnackbar({
          snackType: 'success',
          snackMessage: 'This tracker not have alarms in this time',
        })
      );
    }

    const alarms = historyData.reduce(
      (obj, item) => {
        obj.alarms = { ...obj.alarms, [item.created]: item };
        obj.alarmIds.push(item.created);
        return obj;
      },
      {
        alarms: {},
        alarmIds: [],
      }
    );

    yield put(
      actions.getAlarmTrackerSucceed({
        trackerId: action.payload.data.trackerId,
        alarms,
      })
    );
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
    yield put(actions.getAlarmTrackerFailed(payload));
  }
}
export default function* trackingWatcher() {
  yield takeLatest(types.CHANGE_TRACKING_VIEW, changeTrackingViewSaga);
  yield takeLatest(types.GET_HISTORY_TRACKER_REQUESTED, getHistoryTrackerSaga);
  yield takeLatest(types.GET_ALARM_TRACKER_REQUESTED, getAlarmTrackerSaga);
}
