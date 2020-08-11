import { takeLatest, call, put, select } from 'redux-saga/effects';
import { ActionType } from '@Interfaces/index';
import { addContactFailAction, addContactSuccesstAction } from '../actions';
import * as apiServices from '../../services';
import * as types from '../constans';
import { makeSelectProfile } from '@Containers/App/store/selectors';

function* createContactSaga(action: ActionType) {
  const { payload, callback } = action.payload;
  try {
    const profile = yield select(makeSelectProfile());
    yield call(apiServices.createContact, profile.account_id, payload);
    yield callback.fetchSelectContact();
    yield callback.onClose();
    yield put(addContactSuccesstAction(action.payload));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { code: data.message },
    };
    yield put(addContactFailAction(payload));
  }
}
export default function* createContactWatcher() {
  yield takeLatest(types.CREATE_NEW_CONTACT_REQUESTED, createContactSaga);
}
