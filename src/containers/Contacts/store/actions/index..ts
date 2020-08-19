import * as types from '../constants';

export function getContactListRequestAction(account_id: number) {
  console.log('getContactListRequestAction -> account_id', account_id);
  return {
    type: types.GET_LIST_CONTACT_REQUESTED,
    payload: { account_id },
  };
}

export function getContactListSucceedAction(contacts: object) {
  return {
    type: types.GET_LIST_CONTACT_SUCCESSED,
    payload: { contacts },
  };
}

export function getContactListFailedAction(error: object) {
  return {
    type: types.GET_LIST_CONTACT_FAILED,
    payload: { error },
  };
}

export function updateContactListRequestAction() {
  return {
    type: types.UPDATE_LIST_CONTACT_REQUESTED,
  };
}

export function updateContactListSucceedAction(contacts: object) {
  return {
    type: types.UPDATE_LIST_CONTACT_SUCCESSED,
    payload: { contacts },
  };
}

export function updateContactListFailedAction(error: object) {
  return {
    type: types.UPDATE_LIST_CONTACT_FAILED,
    payload: { error },
  };
}

export function addContactRequestAction(data, callback) {
  return {
    type: types.CREATE_NEW_CONTACT_REQUESTED,
    payload: {
      data,
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

export const searchContactRequestedAction = (search: string | null) => ({
  type: types.SEARCH_CONTACT_REQUESTED,
  payload: { search },
});

export const searchContactSucceedAction = (
  contactIds: Array<number | string>
) => ({
  type: types.SEARCH_CONTACT_SUCCEED,
  payload: { contactIds },
});

export const searchContactFailedAction = (error: object) => ({
  type: types.SEARCH_CONTACT_FAILED,
  payload: { error },
});

export const deleteContactRequestedAction = (contact_id: number, callback) => ({
  type: types.DELETE_CONTACT_REQUESTED,
  payload: { contact_id, callback },
});

export const deleteContactSucceedAction = payload => ({
  type: types.DELETE_CONTACT_SUCCEED,
  payload,
});

export const deleteContactFailedAction = (error: object) => ({
  type: types.DELETE_CONTACT_FAILED,
  payload: { error },
});

export const editContactRequestedAction = (data, contact_id, callback) => ({
  type: types.EDIT_CONTACT_REQUESTED,
  payload: { data, contact_id, callback },
});

export const editContactSucceedAction = payload => ({
  type: types.EDIT_CONTACT_SUCCEED,
  payload,
});

export const editContactFailedAction = (error: object) => ({
  type: types.EDIT_CONTACT_FAILED,
  payload: { error },
});
