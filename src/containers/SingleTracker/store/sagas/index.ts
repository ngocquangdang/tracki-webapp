import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';

import * as actions from '../actions';
import { makeSelectProfile } from '@Containers/App/store/selectors';
import { makeSelectTrackerId } from '@Containers/Trackers/store/selectors';

import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { selectTrackerIdAction } from '@Containers/Trackers/store/actions';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';
import { makeSelectContacts } from '@Containers/Contacts/store/selector';
import { getContactListSucceedAction } from '@Containers/Contacts/store/actions/index.';

function* fetchTrackerSettingsSaga(action) {
  try {
    const profile = yield select(makeSelectProfile());
    const { data } = yield call(
      apiServices.getTrackerSettings,
      profile.account_id,
      action.payload.settingId
    );
    yield put(actions.fetchTrackerSettingsSucceedAction(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    yield put(actions.fetchTrackerSettingsFailedAction(payload));
  }
}

function* updateTrackerSettingSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { settingId, settings } = action.payload;
    const { file, ...setting } = settings;

    const tracker = {
      device_name: setting.device_name,
      device_id: setting.device_id,
      icon_url: null,
    };

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const { data: iconData } = yield call(
        apiServices.uploadImage,
        account_id,
        tracker.device_id,
        formData
      );
      tracker.icon_url = iconData.icon_url;
    } else {
      delete tracker.icon_url;
    }

    yield call(apiServices.updateSettings, account_id, settingId, setting);
    yield put(action.updateTrackerAction(tracker.device_id, tracker));
    yield put(actions.fetchTrackerSettingsSucceedAction(setting));
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
    yield put(actions.updateTrackerSettingsFailedAction(payload));
  }
}
function* getContactListSaga(action) {
  try {
    const { data: profile } = yield put(fetchUserRequestedAction());
    const { data } = yield call(
      apiServices.getContactList,
      profile?.account_id
    );
    const contacts = data.reduce(
      (obj, item) => {
        obj.contacts = { ...obj.contacts, [item.id]: item };
        obj.contactIds.push(item.id);
        return obj;
      },
      {
        contacts: {},
        contactIds: [],
      }
    );

    yield put(getContactListSucceedAction(contacts));
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
    yield put(actions.getContactListFailedAction(payload));
  }
}
function* activeLinkShareLocationSaga(action) {
  const device_id = yield select(makeSelectTrackerId());
  try {
    const profile = yield select(makeSelectProfile());
    const { data } = yield call(
      apiServices.activeLinkShareLocation,
      profile.account_id,
      device_id,
      action.payload.duration
    );
    yield put(actions.generateLinkShareLocationSucceed(data[0]));
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
    yield put(actions.generateLinkShareLocationFailed(payload));
  }
}

function* deactiveLinkShareLocationSaga(action) {
  const device_id = yield select(makeSelectTrackerId());
  try {
    const profile = yield select(makeSelectProfile());
    yield call(
      apiServices.deactiveLinkShareLocation,
      profile.account_id,
      device_id
    );
    yield put(actions.deactiveLinkShareLocationSuccess());
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    yield put(actions.deactiveLinkShareLocationFailed(payload));
  }
}

function* sendBeepSaga(action) {
  try {
    const profile = yield select(makeSelectProfile());
    yield call(apiServices.sendBeep, profile.account_id, action.payload.data);
    yield put(actions.sendBeepSucceed());
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    yield put(actions.sendBeepFailed(payload));
  }
}

function* getContactAssignedSaga(action) {
  const { device_id } = action.payload;
  try {
    const profile = yield select(makeSelectProfile());

    const { data } = yield call(
      apiServices.contactAssigned,
      profile.account_id,
      device_id
    );
    console.log(data);
    const contactAssigned = data.contactAssignments.reduce(
      (obj, item) => {
        obj.contactAssigneds = {
          ...obj.contactAssigneds,
          [item.contactId]: item,
        };
        obj.contactAssignedIds.push(item.contactId);
        return obj;
      },
      {
        contactAssigneds: {},
        contactAssignedIds: [],
      }
    );
    yield put(actions.getContactAssignedSucceedAction(contactAssigned));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.getContactAssignedFailedAction(payload));
  }
}

function* searchContactsSaga(action) {
  try {
    const contacts = yield select(makeSelectContacts());
    const searchKey = action.payload.search || '';
    const newIds = Object.keys(contacts).filter(id =>
      contacts[id].name.toLowerCase().includes(searchKey.toLowerCase())
    );
    console.log('aaaaaa', newIds);
    yield put(actions.searchContactSucceedAction(newIds));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.searchContactFailedAction(payload));
  }
}

function* addContactAssignSaga(action) {
  const { data, eventType } = action.payload;
  try {
    const profile = yield select(makeSelectProfile());
    const device_id = yield select(makeSelectTrackerId());

    yield call(
      apiServices.addContactAssign,
      profile.account_id,
      device_id,
      data,
      eventType
    );
    yield put(selectTrackerIdAction(device_id));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.addContactAssignedFailedAction(payload));
  }
}

function* removeContactAssignSaga(action) {
  const { data, eventType } = action.payload;

  try {
    const profile = yield select(makeSelectProfile());
    const device_id = yield select(makeSelectTrackerId());
    yield call(
      apiServices.removeContactAssigned,
      profile.account_id,
      device_id,
      data,
      eventType
    );
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(actions.removeContactAssignedFailedAction(payload));
  }
}
// function* addNewContactSaga(action) {
//   const { data, callback } = action.payload;
//   try {
//     const profile = yield select(makeSelectProfile());
//     yield call(apiServices.createContact, profile.account_id, data);
//     yield put(actions.getContactListRequestAction(profile.account_id));
//     yield callback();
//     yield put(actions.addContactSuccesstAction(action.payload));
//   } catch (error) {
//     const { data = {} } = { ...error };
//     const payload = {
//       ...data,
//       errors: { code: data.message },
//     };
//     yield put(actions.addContactFailAction(payload));
//   }
// }
export default function* appWatcher() {
  yield takeLatest(
    types.GET_TRACKER_SETTINGS_REQUESTED,
    fetchTrackerSettingsSaga
  );
  yield takeLatest(
    types.UPDATE_TRACKER_SETTINGS_REQUESTED,
    updateTrackerSettingSaga
  );
  yield takeLatest(types.GET_LIST_CONTACT_REQUESTED, getContactListSaga);
  yield takeLatest(
    types.ACTIVE_LINK_SHARE_REQUESTED,
    activeLinkShareLocationSaga
  );
  yield takeLatest(
    types.DEACTIVE_LINK_SHARE_REQUESTED,
    deactiveLinkShareLocationSaga
  );
  yield takeLatest(types.SEND_BEEP_REQUESTED, sendBeepSaga);
  yield takeLatest(types.SEARCH_CONTACT_REQUESTED, searchContactsSaga);
  yield takeLatest(
    types.GET_CONTACT_ASSIGNED_REQUESTED,
    getContactAssignedSaga
  );
  yield takeLatest(types.ADD_CONTACT_ASSIGNED_REQUESTED, addContactAssignSaga);
  yield takeLatest(
    types.REMOVE_CONTACT_ASSIGNED_REQUESTED,
    removeContactAssignSaga
  );
  // yield takeLatest(types.CREATE_NEW_CONTACT_REQUESTED, addNewContactSaga);
}
