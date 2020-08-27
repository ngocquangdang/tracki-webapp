import produce from 'immer';
import { ActionType } from '@Interfaces';
import * as types from '../constants';

export const initialState = {
  errors: {},
  errorsMessage: '',
  isRequesting: false,
  trackerPlan: [],
  formData: {
    device_id: '',
    imei: '',
    order: '',
    selectedPlan: [],
  },
  account_id: 0,
};
const RenewTrackerReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
  produce(state, draft => {
    switch (type) {
      case types.GET_RENEW_DEVICE_PLAN_REQUESTED:
      case types.RENEW_DEVICE_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.GET_RENEW_DEVICE_PLAN_SUCCESSED:
        draft.isRequesting = false;
        draft.trackerPlan = payload.payload;
        draft.account_id = payload.account_id;
        draft.errors = {};
        break;
      case types.RENEW_DEVICE_SUCCESSED:
        draft.isRequesting = false;
        break;
      case types.UPDATE_STORE:
        draft.formData = {
          ...state.formData,
          ...payload,
        };
        break;
      case types.GET_RENEW_DEVICE_PLAN_FAILED:
      case types.RENEW_DEVICE_FAILED:
        draft.isRequesting = false;
        draft.errors = payload;
        break;
      default:
        break;
    }
  });

export default RenewTrackerReducer;
