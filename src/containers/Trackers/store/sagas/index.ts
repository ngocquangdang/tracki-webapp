import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { makeSelectTrackers, makeSelectGeofences } from '../selectors';

function* fetchTrackersSaga(action) {
  try {
    const { data } = yield call(
      apiServices.fetchTrackers,
      action.payload.accountId
    );
    const tracker = normalizeTrackers(data);
    yield put(actions.fetchTrackersSucceedAction(tracker));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    yield put(actions.fetchTrackersFailedAction(payload));
  }
}

function normalizeTrackers(data: { devices: Array<any> }) {
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
        current_device_plan: current_device_plan?.id,
        active_device_plans: trackerPlans,
      };
      if (current_device_plan) {
        result.trackerPlans[current_device_plan.id] = current_device_plan;
      }
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

function normalizeGeofences(geofences: Array<any>) {
  const newGeofences = geofences || [];
  const geofence = newGeofences.reduce(
    (result, geo) => {
      result.geofences[geo.id] = { ...geo };
      result.geofenceIds.push(geo.id);
      return result;
    },
    {
      geofences: {},
      geofenceIds: [],
      selectedGeofenceId: null,
    }
  );
  return geofence;
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
    const payload = { ...data };
    yield put(actions.searchTrackersFailedAction(payload));
  }
}

function* searchGeofencesSaga(action) {
  try {
    const geofences = yield select(makeSelectGeofences());
    const searchKey = action.payload.search || '';
    const newIds = Object.keys(geofences).filter(id =>
      geofences[id].name.toLowerCase().includes(searchKey.toLowerCase())
    );
    yield put(actions.searchGeofencesSucceedAction(newIds));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.searchGeofencesFailedAction(payload));
  }
}

function* fetchGeofencesSaga(action) {
  try {
    const { data } = yield call(
      apiServices.fetchGeofences,
      action.payload.accountId
    );
    const geofences = normalizeGeofences(data);

    yield put(actions.fetchGeofencesSucceedAction(geofences));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.fetchGeofencesFailedAction(payload));
  }
}

function* updateGeofenceSaga(action) {
  try {
    const { geoId, data } = action.payload;
    yield put(actions.updateGeofenceSucceedAction(geoId, data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.updateGeofenceFailedAction(payload));
  }
}

export default function* appWatcher() {
  yield takeLatest(types.GET_TRACKERS_REQUESTED, fetchTrackersSaga);
  yield takeLatest(types.GET_GEOFENCES_REQUESTED, fetchGeofencesSaga);
  yield takeLatest(types.SEARCH_TRACKERS_REQUESTED, searchTrackersSaga);
  yield takeLatest(types.SEARCH_GEOFENCES_REQUESTED, searchGeofencesSaga);
  yield takeLatest(types.UPDATE_GEOFENCE_REQUESTED, updateGeofenceSaga);
}
