import {
  takeLatest,
  call,
  put,
  select,
  all,
  takeEvery,
} from 'redux-saga/effects';
import produce from 'immer';

import * as types from '../constants';
import * as apiServices from '../services';
import * as appServices from '@Containers/App/store/services';

import * as actions from '../actions';
import { makeSelectTrackers, makeSelectGeofences } from '../selectors';
import { makeSelectProfile } from '@Containers/App/store/selectors';
import { updateContactListSucceedAction } from '@Containers/Contacts/store/actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';

function* fetchTrackersSaga(action) {
  try {
    const { accountId } = action.payload;
    const { data } = yield call(apiServices.fetchTrackers, accountId);
    let tracker = normalizeTrackers(data);

    if (tracker.trackerIds.length > 0) {
      const { data: assignmentsData } = yield call(
        apiServices.fetchAssignmentsByTrackerIds,
        accountId,
        tracker.trackerIds
      );

      tracker = assignmentsData.reduce((result, item) => {
        const { fences, device_id, geozones, settings, contacts } = item;
        // fence reduce
        result.fences = fences.reduce((objFences, fItem) => {
          objFences[fItem.id] = fItem;
          result.trackers[device_id].fences = [
            ...(result.trackers[device_id].fences || []),
            fItem.id,
          ];
          return objFences;
        }, result.fences);

        // contact reduce
        result.contacts = contacts.reduce((objContacts, cItem) => {
          objContacts[cItem.id] = cItem;
          result.trackers[device_id].contacts = [
            ...(result.trackers[device_id].contacts || []),
            cItem.id,
          ];
          return objContacts;
        }, result.contacts);

        // geozones reduce => reference to Geofence list
        geozones.map(geoItem => {
          result.trackers[device_id].geozones = [
            ...(result.trackers[device_id].geozones || []),
            geoItem.id,
          ];
          return geoItem;
        });

        // settings reduce
        result.settings[settings.id] = settings;

        return result;
      }, tracker);
    }

    const {
      contacts,
      contactIds,
      contactAssigneds,
      contactAssignedIds,
      ...trackerData
    } = tracker;

    yield put(
      updateContactListSucceedAction({
        contacts,
        contactIds,
        contactAssigneds,
        contactAssignedIds,
      })
    );
    yield put(actions.fetchTrackersSucceedAction(trackerData));
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
      fences: {},
      contacts: {},
      contactIds: [],
      contactAssigneds: {},
      contactAssignedIds: [],
      settings: {},
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
  const { data } = yield call(apiServices.getAllAssignment, accountId, geoId);
  return {
    geofenceId: geoId,
    trackers: data.map(d => d.deviceId),
  };
}

function* fetchGeofencesSaga(action) {
  try {
    const { accountId } = action.payload;
    const { data } = yield call(apiServices.fetchGeofences, accountId);
    const geofences = normalizeGeofences(data);
    const assignments = geofences.geofenceIds.map(id =>
      call(getAssignment, accountId, id)
    );
    const response = yield all(assignments);
    response.map(({ geofenceId, trackers }) => {
      if (geofences.geofences[geofenceId]) {
        geofences.geofences[geofenceId].trackers = trackers;
      }
      return null;
    });

    yield put(actions.fetchGeofencesSucceedAction(geofences));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.fetchGeofencesFailedAction(payload));
  }
}

function* saveGeofenceSaga(action) {
  try {
    const geofences = yield select(makeSelectGeofences());
    const { account_id } = yield select(makeSelectProfile());
    const {
      geoId,
      data: { isLinked, trackerId, ...dataBody },
    } = action.payload;
    const geo = { ...geofences[geoId], ...dataBody };
    yield call(apiServices.updateGeofence, account_id, geoId, geo);
    yield put(actions.saveGeofenceSucceedAction(geoId, geo));
    isLinked
      ? yield put(actions.linkTrackersRequestAction(geoId, [trackerId]))
      : yield put(actions.unlinkTrackersRequestAction(geoId, [trackerId]));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.saveGeofenceFailedAction(payload));
  }
}

function* removeGeofenceSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { geofenceId } = action.payload;
    yield call(apiServices.deleteGeofence, account_id, geofenceId);
    yield put(actions.removeGeofenceSuccessAction(geofenceId));
    window.geosDrawn[geofenceId] &&
      window.mapEvents.map.mapApi.removeLayer(window.geosDrawn[geofenceId]);
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
    yield put(actions.linkTrackersSuccessAction(geofenceId, trackerIds));

    // update tracker linked
    const trackers = yield select(makeSelectTrackers());
    const newTrackers = produce(trackers, draf => {
      trackerIds.map(id => {
        draf[id].geozones = draf[id].geozones || [];
        if (!draf[id].geozones.includes(geofenceId)) {
          draf[id].geozones.push(geofenceId);
        }
        return id;
      });
    });
    yield put(actions.updateTrackersLinkedGeofence(newTrackers));
    yield put(
      showSnackbar({
        snackMessage: 'Linked success',
        snackType: 'success',
      })
    );
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
    yield put(actions.unlinkTrackersSuccessAction(geofenceId, trackerIds));

    // update tracker unlinked
    const trackers = yield select(makeSelectTrackers());
    const newTrackers = produce(trackers, draf => {
      trackerIds.map(id => {
        draf[id].geozones = draf[id].geozones.filter(
          geoId => geoId !== geofenceId
        );
        return id;
      });
    });
    yield put(actions.updateTrackersUnlinkGeofence(newTrackers));
    yield put(
      showSnackbar({
        snackMessage: 'Unlinked success',
        snackType: 'success',
      })
    );
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.unlinkTrackersFailAction(payload));
  }
}

function* createNewGeofenceSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const {
      geofence: { isLinked, trackerId, ...dataBody },
    } = action.payload;
    const { data: responseData } = yield call(
      apiServices.createNewGeofence,
      account_id,
      dataBody
    );
    yield put(actions.fetchGeofencesRequestedAction(account_id));
    yield put(actions.createGeofenceSuccessAction());
    window.mapEvents.map.mapApi.removeLayer(window.geosDrawn[dataBody.id]);
    if (isLinked) {
      yield put(
        actions.linkTrackersRequestAction(responseData.id, [trackerId])
      );
    }
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.createGeofenceFailAction(payload));
  }
}

function* refreshLocationSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    yield call(apiServices.refreshLocaion, account_id, action.payload.data);
    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Refresh location is success',
      })
    );
  } catch (error) {
    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Refresh location is faile',
      })
    );
  }
}

function* getSmsCounterSaga(action) {
  const { device_id } = action.payload;
  try {
    const { data } = yield call(appServices.fetchUser);
    // const { account_id } = yield select(makeSelectProfile());
    const { data: smsCounter } = yield call(
      apiServices.getSmsCounter,
      data.account_id,
      device_id
    );
    yield put(actions.getDeviceSMSCounterSucceedAction(smsCounter));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    if (data.message_key !== '') {
      yield put(showSnackbar({ snackType: 'error', snackMessage: data.error }));
    }
    yield put(actions.getDeviceSMSCounterFailedAction(payload));
  }
}

function* getdeviceSubscriptionDetailSaga(action) {
  const { data } = action.payload;
  try {
    const { data: deviceSubscription } = yield call(
      apiServices.deviceSubscriptionDetail,
      data
    );

    yield put(actions.getDeviceSubscripttionSucceedAction(deviceSubscription));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    if (data.message_key !== '') {
      yield put(
        showSnackbar({ snackType: 'error', snackMessage: data.message })
      );
    }
    yield put(actions.getDeviceSubscripttionFailedAction(payload));
  }
}

function* getSOSalertSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { data } = yield call(
      apiServices.getSOSalert,
      account_id,
      action.payload.data.alarm_types,
      action.payload.data.device_ids,
      action.payload.data.limit,
      action.payload.data.page,
      action.payload.data.read_status,
      action.payload.data.sort_direction
    );

    const trackers = yield select(makeSelectTrackers());
    let alert = {
      alerts: {},
      alertsIds: [],
    };
    const newTrackers = produce(trackers, draf => {
      alert = data.reduce((obj, item) => {
        draf[item.device_id].alerts = draf[item.device_id].alerts || [];
        draf[item.device_id].alerts.push(item.id);
        obj.alerts = { ...obj.alerts, [item.id]: item };
        obj.alertsIds.push(item.id);
        return obj;
      }, alert);
    });

    yield put(actions.getSOSalertTrackerSucceed({ alert, newTrackers }));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    if (data.message_key !== '') {
      yield put(
        showSnackbar({ snackType: 'error', snackMessage: data.message })
      );
    }
    yield put(actions.getSOSalertTrackerFailed(payload));
  }
}

function* readSOSalertSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { data } = yield call(
      apiServices.readSOSalert,
      account_id,
      action.payload.data
    );

    yield put(actions.readSOSalertSucceed(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    if (data.message_key !== '') {
      yield put(
        showSnackbar({ snackType: 'error', snackMessage: data.message })
      );
    }
    yield put(actions.readSOSalertFailed(payload));
  }
}

function* mqttUpdateTrackerSaga(action) {
  const {
    payload: { tracker: trackerAct },
  } = action;
  const trackers = yield select(makeSelectTrackers());
  const newTrackers = produce(trackers, draf => {
    let tracker = draf[trackerAct.device_id];
    tracker.histories = tracker.histories || [];
    tracker.histories.push({
      lat: tracker.lat,
      lng: tracker.lng,
      speed: tracker.speed,
      battery: tracker.battery,
      altitude: tracker.altitude,
      hdop: tracker.hdop,
    });
    tracker = {
      ...tracker,
      ...trackerAct,
    };
    draf[trackerAct.device_id] = tracker;
  });
  const tracker = newTrackers[trackerAct.device_id];

  yield put(actions.mqttUpdateTrackerSuccessAction(tracker));
}

export default function* appWatcher() {
  yield takeLatest(types.GET_TRACKERS_REQUESTED, fetchTrackersSaga);
  yield takeLatest(types.GET_GEOFENCES_REQUESTED, fetchGeofencesSaga);
  yield takeLatest(types.SEARCH_TRACKERS_REQUESTED, searchTrackersSaga);
  yield takeLatest(types.SEARCH_GEOFENCES_REQUESTED, searchGeofencesSaga);
  yield takeLatest(types.SAVE_GEOFENCE_REQUESTED, saveGeofenceSaga);
  yield takeLatest(types.CREATE_GEOFENCE_REQUESTED, createNewGeofenceSaga);
  yield takeLatest(types.REMOVE_GEOFENCE_REQUESTED, removeGeofenceSaga);
  yield takeLatest(types.LINK_TRACKERS_REQUESTED, linkTrackersSaga);
  yield takeLatest(types.UNLINK_TRACKERS_REQUESTED, unlinkTrackersSaga);
  yield takeLatest(types.REFRESH_LOACTION_REQUESTED, refreshLocationSaga);
  yield takeLatest(types.GET_SMS_COUNTER_REQUESTED, getSmsCounterSaga);
  yield takeLatest(
    types.GET_DEVICE_SUBSCRIPTION_REQUESTED,
    getdeviceSubscriptionDetailSaga
  );
  yield takeLatest(types.GET_SOS_ALERT_TRACKER_REQUESTED, getSOSalertSaga);
  yield takeLatest(types.READ_SOS_ALERT_TRACKER_REQUESTED, readSOSalertSaga);
  yield takeEvery(types.MQTT_UPDATE_TRACKER, mqttUpdateTrackerSaga);
}
