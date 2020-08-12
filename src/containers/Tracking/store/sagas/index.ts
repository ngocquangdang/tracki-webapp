import { takeLatest, put, select } from 'redux-saga/effects';

import { makeSelectTrackers } from '@Containers/Trackers/store/selectors';
import { changeTrackersTracking } from '../actions';
import * as types from '../constants';

function* changeTrackingViewSaga(action) {
  const { viewMode } = action.payload;
  const isMultiView = ['multi_screen', 'multi_view'].includes(viewMode);

  if (isMultiView) {
    const isMultiScreen = viewMode === 'multi_screen';
    const trackers = yield select(makeSelectTrackers());
    const trackerIds = Object.keys(trackers)
      .filter((id, index) => index < 4)
      .map(id => +id);
    yield put(
      changeTrackersTracking(isMultiScreen ? trackerIds : [trackerIds[0]])
    );
  }
}

export default function* trackingWatcher() {
  yield takeLatest(types.CHANGE_TRACKING_VIEW, changeTrackingViewSaga);
}
