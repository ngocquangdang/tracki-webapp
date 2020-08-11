import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { makeSelectProfile } from '@Containers/App/store/selectors';
import { showSnackbar } from '@Containers/Snackbar/store/actions';

function changeTrackersTrackingSaga(action) {
  console.log('___changeTrackersTrackingSaga', action);
}

function* getHistoryTrackerSaga(action) {
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
    const histories = historyData.reduce((result, item) => {
      result.push([item.lat, item.lng, 0.2]);
      return result;
    }, []);
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

export default function* trackingWatcher() {
  yield takeLatest(types.CHANGE_TRACKERS_TRACKING, changeTrackersTrackingSaga);
  yield takeLatest(types.GET_HISTORY_TRACKER_REQUESTED, getHistoryTrackerSaga);
}
