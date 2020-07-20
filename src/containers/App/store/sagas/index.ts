import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import CookieInstance from '@Utils/cookie';
import { makeSelectTrackers } from '../selectors';

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
    const tracker = normalizeDevices(data);

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
function normalizeDevices(data: { devices: Array<any> }) {
  const newDevices = data?.devices || [];
  const tracker = newDevices.reduce(
    (result, d) => {
      const { current_device_plan, active_device_plans, ...rest } = d;
      const trackerPlans = active_device_plans.reduce((arr, i) => {
        result.trackerPlans[i.id] = i;
        return [...arr, i.id];
      }, []);
      result.trackers[d.device_id] = {
        ...rest,
        current_device_plan: current_device_plan.id,
        active_device_plans: trackerPlans,
      };
      result.trackerPlans[current_device_plan.id] = current_device_plan;
      result.trackerIds.push(d.device_id);
      return result;
    },
    {
      trackers: {},
      trackerIds: [],
      trackerPlans: {},
      selectedTrackerId: null,
    }
  );
  return tracker;
}
export function* logoutSaga() {
  // const res = yield call(apiServices.logout);
  const res = true;
  CookieInstance.removeCookie(process.env.COOKIE_NAME || 'token');
  if (res) {
    yield put(actions.logoutSucceedAction());
    window.location.replace('/');
    return;
  }
  yield put(actions.logoutFailedAction());
}
function* searchTrackersSaga(action) {
  try {
    const trackers = yield select(makeSelectTrackers());
    const searchKey = action.payload.search || '';
    const newIds = Object.keys(trackers).filter(id =>
      trackers[id].device_name.toLowerCase().includes(searchKey.toLowerCase())
    );
    yield put(actions.searchTrackersSucceedAction(newIds));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { email: data.message },
    };
    yield put(actions.searchTrackersFailedAction(payload));
  }
}
export default function* appWatcher() {
  yield takeLatest(types.GET_PROFILE_REQUESTED, fetchProfileSaga);
  yield takeLatest(types.GET_TRACKERS_REQUESTED, fetchTrackersSaga);
  yield takeLatest(types.LOGOUT, logoutSaga);
  yield takeLatest(types.SEARCH_TRACKERS_REQUESTED, searchTrackersSaga);
}
