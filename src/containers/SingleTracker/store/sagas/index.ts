import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';

import * as actions from '../actions';
import { makeSelectProfile } from '@Containers/App/store/selectors';
import { makeSelectTrackerId } from '@Containers/Trackers/store/selectors';

import { showSnackbar } from '@Containers/Snackbar/store/actions';
// import { ActionType } from '@Interfaces';
import { getUserRequestAction } from '@Containers/AccountSetting/store/actions';

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
  const { speed_unit, settingId, settings } = action.payload;
  const { account_id } = yield select(makeSelectProfile());
  try {
    // const { account_id } = yield select(makeSelectProfile());
    // const { settingId, settings } = action.payload;
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
    yield put(actions.updatePreferancesRequestedAction(speed_unit));
    yield put(actions.fetchTrackerSettingsRequestedAction(settingId));
    yield put(actions.updateTrackerAction(tracker.device_id, tracker));
    yield put(getUserRequestAction(account_id));
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

function* updatePreferancesSaga(action) {
  const { speed_unit } = action.payload;
  const { account_id, preferances } = yield select(makeSelectProfile());

  try {
    const newPreferance = {
      ...preferances,
      speed_unit,
    };
    yield call(apiServices.updatePreferences, account_id, newPreferance);
    yield put(actions.updatePreferancesSucceedAction(speed_unit));
    // yield put(getUserRequestAction(account_id));
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
    yield put(actions.updatePreferancesFailedAction(payload));
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
  yield takeLatest(
    types.ACTIVE_LINK_SHARE_REQUESTED,
    activeLinkShareLocationSaga
  );
  yield takeLatest(
    types.DEACTIVE_LINK_SHARE_REQUESTED,
    deactiveLinkShareLocationSaga
  );
  yield takeLatest(types.SEND_BEEP_REQUESTED, sendBeepSaga);
  yield takeLatest(
    types.UPDATE_PREFERANCES_TRACKER_REQUESTED,
    updatePreferancesSaga
  );
}
