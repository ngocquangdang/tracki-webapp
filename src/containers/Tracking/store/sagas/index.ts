// import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

import * as types from '../constants';

function changeTrackersTrackingSaga(action) {
  console.log('___changeTrackersTrackingSaga', action);
}

export default function* trackingWatcher() {
  yield takeLatest(types.CHANGE_TRACKERS_TRACKING, changeTrackersTrackingSaga);
}
