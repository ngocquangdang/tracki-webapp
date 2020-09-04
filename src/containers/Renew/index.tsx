import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import RenewTrackerForm from './views';
import {
  getDevicePlanRequestAction,
  updateStore,
  braintreeDropInRequestAction,
  renewDeviceRequestAction,
} from './store/actions';
import { fetchTrackersRequestedAction } from '@Containers/Trackers/store/actions';
import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import saga from './store/sagas';
import reducer from './store/reducers';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectTrackerPlan,
  selectFormData,
  makeSelectFormData,
  makeSelectNewDeviceInfo,
} from './store/selectors';

function RenewTrackerContainer(props: any) {
  useInjectSaga({ key: 'renewtracker', saga });
  useInjectReducer({ key: 'renewtracker', reducer });

  const { getDevicePlanAction, updateStore, formData } = props;

  useEffect(() => {
    const path_name = window.location.pathname;
    const device_id = path_name.split('/')[2];
    updateStore({ ...formData, device_id });
    getDevicePlanAction(device_id);
  }, [getDevicePlanAction, updateStore, formData]);

  return <RenewTrackerForm {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  errorMessage: makeSelectErrorMessage(),
  trackerPlan: makeSelectTrackerPlan(),
  formData: selectFormData(),
  account_id: makeSelectFormData(),
  newDeviceInfo: makeSelectNewDeviceInfo(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDevicePlanAction: (data: any) =>
    dispatch(getDevicePlanRequestAction(data)),
  updateStore: (data: any) => dispatch(updateStore(data)),
  braintreeDropinAction: (formData, callback) =>
    dispatch(braintreeDropInRequestAction(formData, callback)),
  fetchTrackersRequestedAction: account_id =>
    dispatch(fetchTrackersRequestedAction(account_id)),
  renewDeviceAction: (formData, account_id, paymentData) =>
    dispatch(renewDeviceRequestAction(formData, account_id, paymentData)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(RenewTrackerContainer) as React.ComponentType;
