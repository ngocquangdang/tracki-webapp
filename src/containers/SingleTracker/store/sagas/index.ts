import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { makeSelectProfile } from '@Containers/App/store/selectors';
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
    const { device_name, device_id, file, ...setting } = settings;

    const tracker = {
      device_name,
      device_id,
      icon_url: null,
    };

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const { data: iconData } = yield call(
        apiServices.uploadImage,
        account_id,
        device_id,
        formData
      );
      console.log('____uploadImage', iconData);
      tracker.icon_url = iconData.icon_url;
    } else {
      delete tracker.icon_url;
    }

    const bodyRequest = {
      id: settingId,
      device_name,
      device_id,
      preferences: setting.preferences,
    };
    const { data } = yield call(
      apiServices.updateSettings,
      account_id,
      settingId,
      bodyRequest
    );
    console.log('__updateTrackerSettingSaga', data);
    yield put(action.updateTrackerAction(device_id, tracker));
    yield put(actions.fetchTrackerSettingsSucceedAction(bodyRequest));
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

export default function* appWatcher() {
  yield takeLatest(
    types.GET_TRACKER_SETTINGS_REQUESTED,
    fetchTrackerSettingsSaga
  );
  yield takeLatest(
    types.UPDATE_TRACKER_SETTINGS_REQUESTED,
    updateTrackerSettingSaga
  );
}
