import produce from 'immer';
import { ActionType } from '@Interfaces';
import * as types from '../constances';

export const initialState = {
  errors: {},
  errorsMessage: '',
  isRequesting: false,
  assigned: '',
  trackerPlan: [],
  formData: {
    device_id: '',
    imei: '',
    order: '',
    selectedPlan: [],
  },
  token: '',
  account_id: 0,
  newDeviceInfo: {},
};
const AddTrackerReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
  produce(state, draft => {
    console.log('payload', payload);

    switch (type) {
      case types.CHECK_DEVICEID_ASSIGNED_REQUESTED:
      case types.GET_DEVICE_PLAN_REQUESTED:
      case types.GET_TOKEN_FOR_PAYMENT_REQUESTED:
      case types.ADD_DEVICE_REQUESTED:
        // case types.GET_SUB_ACCOUNT_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.GET_SUB_ACCOUNT_REQUESTED:
        // draft.isRequesting = true;
        break;
      case types.CHECK_DEVICEID_ASSIGNED_SUCCESSED:
        draft.assigned = payload.assigned;
        draft.isRequesting = false;
        draft.errors = {};
        break;
      case types.GET_DEVICE_PLAN_SUCCESSED:
        draft.isRequesting = false;
        draft.trackerPlan = payload.payload;
        draft.account_id = payload.account_id;
        draft.errors = {};
        break;
      case types.GET_TOKEN_FOR_PAYMENT_SUCCESSED:
        draft.isRequesting = false;
        draft.token = payload;
        draft.errors = {};
        break;
      case types.ADD_DEVICE_SUCCESSED:
        break;
      case types.GET_SUB_ACCOUNT_SUCCESSED:
        draft.newDeviceInfo = payload;
        break;
      case types.CHECK_DEVICEID_ASSIGNED_FAILED:
      case types.GET_TOKEN_FOR_PAYMENT_FAILED:
        draft.isRequesting = false;
        draft.errorsMessage = payload.message;
        draft.errors = payload;
        break;
      case types.GET_DEVICE_PLAN_FAILED:
        draft.errors = payload;
        break;
      case types.UPDATE_STORE:
        draft.formData = {
          ...state.formData,
          ...payload,
        };
        break;
      default:
        break;
    }
  });

export default AddTrackerReducer;
