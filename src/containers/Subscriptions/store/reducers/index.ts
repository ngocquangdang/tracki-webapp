import produce from 'immer';
import { ActionType } from '@Interfaces';
import * as types from '../constants';

export const initialState = {
  errors: {},
  errorsMessage: '',
  isRequesting: false,
  formData: {
    device_id: '',
    selectedPlan: [],
  },
  countryCode: {},
  planList: {},
};
const SubscriptionReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
  produce(state, draft => {
    switch (type) {
      case types.GET_CONTRY_CODE_REQUESTED:
      case types.GET_CONTRY_CODE_FOLLOW_REQUESTED:
      case types.GET_FATS_TRACKING_FOLLOW_CODE_REQUESTED:
      case types.BUY_FAST_TRACKING_SUBSCRIPTION_REQUESTED:
      case types.BUY_SMS_SUBSCRIPTION_REQUESTED:
      case types.BRAINTREE_DROPIN_SUBSCRIPTION_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.GET_CONTRY_CODE_SUCCESSED:
        draft.isRequesting = false;
        draft.countryCode = payload.data;
        draft.errors = {};
        break;
      case types.GET_CONTRY_CODE_FOLLOW_SUCCESSED:
      case types.GET_FATS_TRACKING_FOLLOW_CODE_SUCCEED:
        draft.planList = payload.data;
        draft.isRequesting = false;
        draft.errors = {};
        break;
      case types.BUY_FAST_TRACKING_SUBSCRIPTION_SUCCESSED:
      case types.BUY_SMS_SUBSCRIPTION_SUCCESSED:
        draft.isRequesting = false;
        draft.errors = {};
        break;
      case types.UPDATE_SUBSCRIPTION_STORE:
        draft.formData = {
          ...state.formData,
          ...payload,
        };
        break;
      case types.GET_CONTRY_CODE_FOLLOW_FAILED:
      case types.GET_FATS_TRACKING_FOLLOW_CODE_FAILED:
      case types.GET_CONTRY_CODE_FAILED:
      case types.BUY_FAST_TRACKING_SUBSCRIPTION_FAILED:
      case types.BUY_SMS_SUBSCRIPTION_FAILED:
      case types.BRAINTREE_DROPIN_SUBSCRIPTION_FAILED:
        draft.isRequesting = false;
        draft.errors = payload;
        break;
      default:
        break;
    }
  });

export default SubscriptionReducer;
