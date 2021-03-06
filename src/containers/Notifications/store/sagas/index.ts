import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { makeSelectProfile } from '@Containers/App/store/selectors';

function* fetchNotificationSaga(action) {
  try {
    const { account_id } = yield select(makeSelectProfile());
    const { data } = yield call(
      apiServices.fetchNotification,
      account_id,
      action.payload.data.alarm_types,
      action.payload.data.limit,
      action.payload.data.page
    );
    const notifications = data.reduce(
      (obj, item) => {
        obj.notifications = { ...obj.notifications, [item.id]: item };
        obj.notificationsIds.push(item.id);
        return obj;
      },
      {
        notifications: {},
        notificationsIds: [],
      }
    );
    yield put(actions.fetchNotficationSucceed(notifications));
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
    yield put(actions.fetchNotficationFailed(payload));
  }
}

export default function* trackingWatcher() {
  yield takeLatest(types.FETCH_NOTIFICATION_REQUESTED, fetchNotificationSaga);
}
