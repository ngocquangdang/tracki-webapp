import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { makeSelectProfile } from '@Containers/App/store/selectors';
import { makeSelectTrackerId } from '@Containers/Trackers/store/selectors';
import notification from '@Utils/notification';

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
      notification.error(data.error || data.message);
    }
    yield put(actions.updateTrackerSettingsFailedAction(payload));
  }
}
function* getContactListSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const res = yield call(apiServices.getContactList, account_id);
    yield put(actions.getContactListSucceedAction(res.data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      notification.error(data.error || data.message);
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
      notification.error(data.error || data.message);
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
}
