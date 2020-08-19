import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../../services';

import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { ActionType } from '@Interfaces';
import {
  getContactListSucceedAction,
  getContactListFailedAction,
  getContactListRequestAction,
  addContactSuccesstAction,
  addContactFailAction,
  searchContactFailedAction,
  searchContactSucceedAction,
  deleteContactSucceedAction,
  deleteContactFailedAction,
  editContactFailedAction,
  editContactSucceedAction,
} from '../actions/index.';

import { makeSelectContacts } from '../selector';

function* getContactListSaga(action: ActionType) {
  const { account_id } = action.payload;
  try {
    const { data } = yield call(apiServices.getContactList, account_id);
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
    yield put(getContactListFailedAction(payload));
  }
}

function* searchContactsSaga(action) {
  try {
    const contacts = yield select(makeSelectContacts());
    const searchKey = action.payload.search || '';
    const newIds = Object.keys(contacts).filter(id =>
      contacts[id].name.toLowerCase().includes(searchKey.toLowerCase())
    );
    yield put(searchContactSucceedAction(newIds));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = { ...data };
    yield put(searchContactFailedAction(payload));
  }
}

function* addNewContactSaga(action: ActionType) {
  const { data, callback } = action.payload;
  try {
    const { data: profile } = yield call(apiServices.getUserInfo);

    yield call(apiServices.createContact, profile?.account_id, data);
    yield put(getContactListRequestAction(profile?.account_id));
    yield callback();
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

function* deleteContactSaga(action: ActionType) {
  const { contact_id, callback } = action.payload;
  try {
    const { data: profile } = yield call(apiServices.getUserInfo);
    yield call(apiServices.deleteContactList, profile?.account_id, contact_id);
    yield put(getContactListRequestAction(profile?.account_id));
    yield put(deleteContactSucceedAction(action.payload));
    yield callback();
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { code: data.message },
    };
    yield put(deleteContactFailedAction(payload));
  }
}

function* updateContactSaga(action: ActionType) {
  const { contact_id, data, callback } = action.payload;
  try {
    const { data: profile } = yield call(apiServices.getUserInfo);
    yield call(
      apiServices.updateContactList,
      profile?.account_id,
      contact_id,
      data
    );
    yield put(getContactListRequestAction(profile?.account_id));
    yield put(editContactSucceedAction(action.payload));
    yield callback();
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { code: data.message },
    };
    yield put(editContactFailedAction(payload));
  }
}
export default function* appWatcher() {
  yield takeLatest(types.GET_LIST_CONTACT_REQUESTED, getContactListSaga);
  yield takeLatest(types.CREATE_NEW_CONTACT_REQUESTED, addNewContactSaga);
  yield takeLatest(types.SEARCH_CONTACT_REQUESTED, searchContactsSaga);
  yield takeLatest(types.DELETE_CONTACT_REQUESTED, deleteContactSaga);
  yield takeLatest(types.EDIT_CONTACT_REQUESTED, updateContactSaga);
}
