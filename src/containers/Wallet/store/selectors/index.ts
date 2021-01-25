import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const globalState = (state: any) => state.wallet || initialState;

const makeSelectWallet = () => {
  return createSelector(globalState, state => state.myWallet);
};

const makeSelectAdv = () => {
  return createSelector(globalState, state => state.adv);
};

const makeSelectPointHistory = () => {
  return createSelector(globalState, state => state.pointHistory);
};

const makeSelectTrackerProduct = () => {
  return createSelector(globalState, state => state.tracker);
};

const makeSelectAccesoryProduct = () => {
  return createSelector(globalState, state => state.accesory);
};

const makeSelectSubscriptionPlan = () => {
  return createSelector(globalState, state => state.subscriptionPlan);
};

const makeSelectSMSPlan = () => {
  return createSelector(globalState, state => state.smsPlan);
};

const makeSelectIsHiddenHeader = () => {
  return createSelector(globalState, state => state.hiddenHeader);
};

const makeSelectPage = () => {
  return createSelector(globalState, state => state.page);
};

export {
  makeSelectWallet,
  makeSelectAdv,
  makeSelectPointHistory,
  makeSelectTrackerProduct,
  makeSelectAccesoryProduct,
  makeSelectSubscriptionPlan,
  makeSelectSMSPlan,
  makeSelectIsHiddenHeader,
  makeSelectPage,
};
