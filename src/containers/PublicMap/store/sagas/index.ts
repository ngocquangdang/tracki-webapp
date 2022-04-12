import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../../services';

import {
  getDeviceByTokenSucceedAction,
  getDeviceByTokenFailedAction,
} from '../actions';
import {
  fetchTrackersSucceedAction,
  selectTrackerIdAction,
} from '@Containers/Trackers/store/actions';
import { makeSelectTrackers } from '@Containers/Trackers/store/selectors';

function* getDeviceByTokenSaga(action) {
  const { token } = action.payload;
  try {
    const { data } = yield call(apiServices.getDevicesByToken, token);
    const trackerss = yield select(makeSelectTrackers());

    const trackers = data.reduce(
      (obj, item) => {
        const formatItem = {
          device_id: item.deviceId,
          device_name: item.deviceName,
          lat: item.geoLocation.latitude,
          lng: item.geoLocation.longitude,
          ...item,
        };
        obj.trackers = {
          ...obj.trackers,
          [item.deviceId]: {
            ...obj.trackers[item.deviceId],
            ...formatItem,
            histories: trackerss[item.deviceId]?.histories
              ? trackerss[item.deviceId].histories.concat(formatItem)
              : [formatItem],
          },
        };

        obj.trackerIds.push(item.deviceId);
        return obj;
      },
      {
        trackers: {},
        trackerIds: [],
      }
    );
    yield put(fetchTrackersSucceedAction(trackers));
    yield put(selectTrackerIdAction(data[0].deviceId, null));
    yield put(getDeviceByTokenSucceedAction(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };

    yield put(getDeviceByTokenFailedAction(payload));
  }
}

export default function* appWatcher() {
  yield takeLatest(types.GET_DEVICE_BY_TOKEN_REQUESTED, getDeviceByTokenSaga);
}
