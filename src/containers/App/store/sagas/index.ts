import { takeLatest, call, put } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';

function* fetchProfileSaga() {
  try {
    const { data } = yield call(apiServices.fetchUser);
    yield put(actions.fetchUserSucceedAction(data));
    yield put(actions.fetchTrackersRequestedAction(data.account_id));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { email: data.message },
    };
    yield put(actions.fetchUserFailedAction(payload));
  }
}

function* fetchTrackersSaga(action) {
  try {
    const { data } = yield call(
      apiServices.fetchTrackers,
      action.payload.accountId
    );
    const trackerEntity = new schema.Entity(
      'trackers',
      {},
      { idAttribute: 'device_id' }
    );
    const {
      entities: { trackers },
      result: { devices: trackerIds },
    } = normalize(data, { devices: [trackerEntity] });
    const tracker = {
      trackers,
      trackerIds,
    };

    yield put(actions.fetchTrackersSucceedAction(tracker));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { email: data.message },
    };
    yield put(actions.fetchTrackersFailedAction(payload));
  }
}

export default function* appWatcher() {
  yield takeLatest(types.GET_PROFILE_REQUESTED, fetchProfileSaga);
  yield takeLatest(types.GET_TRACKERS_REQUESTED, fetchTrackersSaga);
}
