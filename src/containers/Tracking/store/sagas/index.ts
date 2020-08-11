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
    const { data } = yield call(
      apiServices.getHistoryTracker,
      account_id,
      action.payload.data.trackerId,
      action.payload.data.fromDate,
      action.payload.data.toDate,
      action.payload.data.limit,
      action.payload.data.page,
      action.payload.data.type
    );
    if (data === []) {
      yield put(
        showSnackbar({
          snackType: 'success',
          snackMessage: 'This tracker not have history in this time',
        })
      );
    }
    yield put(actions.getHistoryTrackerSucceed(data));
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
