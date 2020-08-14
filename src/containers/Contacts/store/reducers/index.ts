import produce from 'immer';
import { ActionType } from '@Interfaces';
import * as types from '../constants';

export const initialState = {
  errors: {},
  errorsMessage: '',
  isRequesting: false,
  contacts: {},
  contactIds: [],
};
const AddTrackerReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
  produce(state, draft => {
    switch (type) {
      case types.GET_LIST_CONTACT_REQUESTED:
      case types.CREATE_NEW_CONTACT_REQUESTED:
      case types.EDIT_CONTACT_REQUESTED:
      case types.DELETE_CONTACT_REQUESTED:
      case types.SEARCH_CONTACT_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.GET_LIST_CONTACT_SUCCESSED:
        draft.contacts = payload.contacts.contacts;
        draft.contactIds = payload.contacts.contactIds;
        break;
      case types.SEARCH_CONTACT_SUCCEED:
        draft.contactIds = payload.contactIds;
        break;
      case types.GET_LIST_CONTACT_FAILED:
      case types.CREATE_NEW_CONTACT_FAILED:
      case types.DELETE_CONTACT_FAILED:
      case types.EDIT_CONTACT_FAILED:
        draft.errors = payload.errors;
        break;
      default:
        break;
    }
  });

export default AddTrackerReducer;
