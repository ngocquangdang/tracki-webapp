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
    icon_url: '',
    selectedPlan: [],
  },
  token: '',
  account_id: 0,
};
const AddTrackerReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
  produce(state, draft => {
    switch (type) {
      case types.CHECK_DEVICEID_ASSIGNED_REQUESTED:
      case types.GET_DEVICE_PLAN_REQUESTED:
      case types.GET_TOKEN_FOR_PAYMENT_REQUESTED:
      case types.ADD_DEVICE_REQUESTED:
        draft.isRequesting = true;
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
        draft.isRequesting = false;
        break;
      case types.CHECK_DEVICEID_ASSIGNED_FAILED:
      case types.GET_TOKEN_FOR_PAYMENT_FAILED:
        draft.isRequesting = false;
        draft.errorsMessage = payload.message;
        draft.errors = payload;
        break;
      case types.GET_DEVICE_PLAN_FAILED:
      case types.ADD_DEVICE_FAILED:
        draft.isRequesting = false;
        draft.errors = payload;
        break;
      case types.UPDATE_STORE:
        draft.formData = {
          ...state.formData,
          ...payload,
        };
        break;
      case types.RESET_STORE_ADD_TRACKER:
        draft.formData = {
          device_id: '',
          imei: '',
          order: '',
          icon_url: '',
          selectedPlan: [],
        };
        draft.assigned = '';
        draft.trackerPlan = [];
        break;
      default:
        break;
    }
  });

export default AddTrackerReducer;
