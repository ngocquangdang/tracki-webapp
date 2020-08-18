import { takeLatest, put, call, select } from 'redux-saga/effects';

import * as apiServices from '../../services';
import * as types from '../constants';

import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { makeSelectProfile } from '@Containers/App/store/selectors';
import { ActionType } from '@Interfaces';
import { getHistoryTrackerSucceed, getHistoryTrackerFailed } from '../actions';

function* getHistoryTrackerSaga(action: ActionType) {
  console.log('function*getHistoryTrackerSaga -> action', action);
  const { data } = action.payload;
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { data: historyData } = yield call(
      apiServices.getHistoryTracker,
      account_id,
      data.trackerId,
      data.fromDate,
      data.toDate,
      data.limit,
      data.page,
      data.type
    );
    console.log('function*getHistoryTrackerSaga -> historyData', historyData);
    if (historyData === []) {
      yield put(
        showSnackbar({
          snackType: 'success',
          snackMessage: 'This tracker not have history in this time',
        })
      );
    }
    const histories = historyData.reduce((result, item) => {
      result.push([item.lat, item.lng]);
      return result;
    }, []);
    console.log('function*getHistoryTrackerSaga -> histories', histories);

    yield put(
      getHistoryTrackerSucceed({
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
    yield put(getHistoryTrackerFailed(payload));
  }
}

export default function* trackingWatcher() {
  yield takeLatest(types.GET_HISTORY_TRACKER_REQUESTED, getHistoryTrackerSaga);
}
