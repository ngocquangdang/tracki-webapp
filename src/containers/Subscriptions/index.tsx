import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SubscriptionPage from './views';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';

import trackerSaga from '@Containers/Trackers/store/sagas';
import trackerReducer from '@Containers/Trackers/store/reducers';
import saga from './store/sagas';
import reducer from './store/reducers';

import { makeSelectSmsCounter } from '@Containers/Trackers/store/selectors';
import {
  getCountryCodeRequestedAction,
  getCountryCodeFollowRequestedAction,
  updateSubscriptionStore,
  braintreeDropInSubscriptionRequestAction,
  buySmsSubscriptionRequestAction,
} from './store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectFormData,
  makeSelectCountryCode,
  makeSelectCountryCodeFollow,
} from './store/selectors';
import { getDeviceSMSCounterRequestedAction } from '@Containers/Trackers/store/actions';

function RenewTrackerContainer(props: any) {
  useInjectSaga({ key: 'tracker', saga: trackerSaga });
  useInjectReducer({ key: 'tracker', reducer: trackerReducer });
  useInjectSaga({ key: 'subscription', saga });
  useInjectReducer({ key: 'subscription', reducer });

  const {
    getDeviceSMSCounterRequest,
    getCountryCodeRequest,
    updateSubscriptionStore,
    formData,
  } = props;
  useEffect(() => {
    const path_name = window.location.pathname;
    const device_id = path_name.split('/')[2];
    updateSubscriptionStore({ ...formData, device_id });
    getDeviceSMSCounterRequest(device_id);
    getCountryCodeRequest();
  }, [getDeviceSMSCounterRequest, getCountryCodeRequest]);

  return <SubscriptionPage {...props} />;
}

const mapStateToProps = createStructuredSelector({
  smsCounter: makeSelectSmsCounter(),
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  formData: makeSelectFormData(),
  countryCode: makeSelectCountryCode(),
  countryCodeFollow: makeSelectCountryCodeFollow(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDeviceSMSCounterRequest: (device_id: number) =>
    dispatch(getDeviceSMSCounterRequestedAction(device_id)),
  getCountryCodeRequest: () => dispatch(getCountryCodeRequestedAction()),
  getCountryCodeFollowRequest: (code: number) =>
    dispatch(getCountryCodeFollowRequestedAction(code)),
  updateSubscriptionStore: data => dispatch(updateSubscriptionStore(data)),
  braintreeDropInSubscriptionRequest: (formData, callback) =>
    dispatch(braintreeDropInSubscriptionRequestAction(formData, callback)),
  buySmsSubscriptionRequest: (formData, account_id, paymentData) =>
    dispatch(
      buySmsSubscriptionRequestAction(formData, account_id, paymentData)
    ),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(RenewTrackerContainer) as React.ComponentType;
