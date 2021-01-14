import produce from 'immer';

import { ActionType, WalletDataType } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: WalletDataType = {
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
      default:
        break;
    }
  });
};

export default walletReducer;
