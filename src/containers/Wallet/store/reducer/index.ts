import produce from 'immer';

import { ActionType, WalletDataType } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: WalletDataType = {
  isRequestProduct: false,
  myWallet: {
    isRequestMyWallet: false,
    point: 0,
    my_wallet: 0,
    referral_code: '',
  },
  adv: {
    isRequestAdv: false,
    advs: {},
    advIds: [],
  },
  pointHistory: {
    isRequestPointHistory: false,
    pointHistories: {},
    pointHistoryIds: [],
  },
  tracker: {
    trackers: {},
    trackerIds: [],
  },
  accesory: {
    accesories: {},
    accesoryIds: [],
  },
  subscriptionPlan: [],
  smsPlan: [],
};

const walletReducer = (state = initialState, { type, payload }: ActionType) => {
  return produce(state, (draft: WalletDataType) => {
    switch (type) {
      case types.GET_MY_WALLET_REQUESTED:
        draft.myWallet = {
          ...draft.myWallet,
          isRequestMyWallet: true,
        };
        break;
      case types.GET_MY_WALLET_SUCCEED:
        draft.myWallet = {
          isRequestMyWallet: false,
          ...payload.data,
        };
        break;
      case types.GET_MY_WALLET_FAILED:
        draft.myWallet = {
          ...draft.myWallet,
          isRequestMyWallet: false,
        };
        break;
      case types.GET_ADVERTIMENT_REQUESTED:
        draft.adv = {
          ...draft.adv,
          isRequestAdv: true,
        };
        break;
      case types.GET_ADVERTIMENT_SUCCEED:
        draft.adv = {
          isRequestAdv: false,
          ...payload.data,
        };
        break;
      case types.GET_ADVERTIMENT_FAILED:
        draft.adv = {
          isRequestAdv: false,
          advs: {},
          advIds: [],
        };
        break;
      case types.GET_POINT_HISTORY_REQUESTED:
        draft.pointHistory = {
          pointHistories: {},
          pointHistoryIds: [],
          isRequestPointHistory: true,
        };
        break;
      case types.GET_POINT_HISTORY_SUCCEED:
        draft.pointHistory = {
          isRequestPointHistory: false,
          ...payload.data,
        };
        break;
      case types.GET_POINT_HISTORY_FAILED:
        draft.pointHistory = {
          isRequestPointHistory: false,
          pointHistories: {},
          pointHistoryIds: [],
        };
        break;
      case types.GET_PRODUCT_REQUESTED:
        draft.isRequestProduct = true;
        draft.tracker = {
          trackers: {},
          trackerIds: [],
        };
        draft.accesory = {
          accesories: {},
          accesoryIds: [],
        };
        break;
      case types.GET_PRODUCT_SUCCEED:
        draft.isRequestProduct = false;
        draft.tracker = {
          ...payload.tracker,
        };
        draft.accesory = {
          ...payload.accesory,
        };
        break;
      case types.GET_PRODUCT_FAILED:
        draft.isRequestProduct = false;
        draft.tracker = {
          trackers: {},
          trackerIds: [],
        };
        draft.accesory = {
          accesories: {},
          accesoryIds: [],
        };
        break;

      case types.GET_SUBSCRIPTION_SUCCEED:
        draft.subscriptionPlan = payload.data;
        break;
      case types.GET_SUBSCRIPTION_FAILED:
        draft.subscriptionPlan = [];
        break;
      case types.GET_SMS_PLAN_SUCCEED:
        draft.smsPlan = payload.data;
        break;
      case types.GET_SMS_PLAN_FAILED:
        draft.smsPlan = [];
        break;
      default:
        break;
    }
  });
};

export default walletReducer;
