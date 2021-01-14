import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const globalState = (state: any) => state.wallet || initialState;

const makeSelectWallet = () => {
  return createSelector(globalState, state => state.myWallet);
};

const makeSelectAdv = () => {
  return createSelector(globalState, state => state.adv);
};

export { makeSelectWallet, makeSelectAdv };
