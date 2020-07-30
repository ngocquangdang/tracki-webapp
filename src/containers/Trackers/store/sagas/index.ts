import { takeLatest, call, put, select, all } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { makeSelectTrackers, makeSelectGeofences } from '../selectors';
import { makeSelectProfile } from '@Containers/App/store/selectors';

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

function* getAssignment(accountId: number, geoId: number) {
  return yield call(apiServices.getAllAssignment, accountId, geoId);
}

function* fetchGeofencesSaga(action) {
  try {
    const { accountId } = action.payload;
    const { data } = yield call(apiServices.fetchGeofences, accountId);
    const geofences = normalizeGeofences(data);

    yield put(actions.fetchGeofencesSucceedAction(geofences));
    const assignments = geofences.geofenceIds.map(id =>
      call(getAssignment, accountId, id)
    );
    const response = yield all(assignments);
    console.log('____assignmentDatas', response);
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.fetchGeofencesFailedAction(payload));
  }
}

function* updateGeofenceSaga(action) {
  try {
    const geofences = yield select(makeSelectGeofences());
    const { account_id } = yield select(makeSelectProfile());
    const { geoId, data } = action.payload;
    const geo = { ...geofences[geoId], ...data };
    yield call(apiServices.updateGeofence, account_id, geoId, geo);
    yield put(actions.updateGeofenceSucceedAction(geoId, geo));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.updateGeofenceFailedAction(payload));
  }
}

function* removeGeofenceSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { geofenceId } = action.payload;
    yield call(apiServices.deleteGeofence, account_id, geofenceId);
    yield put(actions.removeGeofenceSuccessAction(geofenceId));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.removeGeofenceFailAction(payload));
  }
}

function* linkTrackersSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { geofenceId, trackerIds } = action.payload;
    yield call(apiServices.linkTrackers, account_id, geofenceId, trackerIds);
    yield put(actions.linkTrackersSuccessAction(geofenceId));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.linkTrackersFailAction(payload));
  }
}

function* unlinkTrackersSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { geofenceId, trackerIds } = action.payload;
    yield call(apiServices.unlinkTrackers, account_id, geofenceId, trackerIds);
    yield put(actions.unlinkTrackersSuccessAction(geofenceId));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.unlinkTrackersFailAction(payload));
  }
}

export default function* appWatcher() {
  yield takeLatest(types.GET_TRACKERS_REQUESTED, fetchTrackersSaga);
  yield takeLatest(types.GET_GEOFENCES_REQUESTED, fetchGeofencesSaga);
  yield takeLatest(types.SEARCH_TRACKERS_REQUESTED, searchTrackersSaga);
  yield takeLatest(types.SEARCH_GEOFENCES_REQUESTED, searchGeofencesSaga);
  yield takeLatest(types.UPDATE_GEOFENCE_REQUESTED, updateGeofenceSaga);
  yield takeLatest(types.REMOVE_GEOFENCE_REQUESTED, removeGeofenceSaga);
  yield takeLatest(types.LINK_TRACKERS_REQUESTED, linkTrackersSaga);
  yield takeLatest(types.UNLINK_TRACKERS_REQUESTED, unlinkTrackersSaga);
}
