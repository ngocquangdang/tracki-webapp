import * as types from '../constans';

export function addContactRequestAction(payload, callback) {
  return {
    type: types.CREATE_NEW_CONTACT_REQUESTED,
    payload: {
      payload,
      callback,
    },
  };
}

export function addContactSuccesstAction(payload) {
  return {
    type: types.CREATE_NEW_CONTACT_SUCCESSED,
    payload,
  };
}

export function addContactFailAction(payload) {
  return {
    type: types.CREATE_NEW_CONTACT_FAILED,
    payload,
  };
}
