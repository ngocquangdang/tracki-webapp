import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AddTrackerForm from './views/mainForm';
import {
  checkDeviceAssignedRequestAction,
  getDevicePlanRequestAction,
  updateStore,
  getTokenForPaymentRequestAction,
  addDeviceRequestAction,
  braintreeDropInRequestAction,
  resetStoreAddTracker,
} from './store/actions';
import { fetchTrackersRequestedAction } from '@Containers/Trackers/store/actions';
import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import saga from './store/sagas';
import reducer from './store/reducers';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSleectAssigned,
  makeSelectErrorMessage,
  makeSelectTrackerPlan,
  selectFormData,
  makeSelectFormData,
  makeSelectNewDeviceInfo,
} from './store/selectors';

function AddTrackerContainer(props: any) {
  useInjectSaga({ key: 'addtracker', saga });
  useInjectReducer({ key: 'addtracker', reducer });

  return <AddTrackerForm {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  assigned: makeSleectAssigned(),
  errorMessage: makeSelectErrorMessage(),
  trackerPlan: makeSelectTrackerPlan(),
  formData: selectFormData(),
  account_id: makeSelectFormData(),
  newDeviceInfo: makeSelectNewDeviceInfo(),
});

const mapDispatchToProps = (dispatch: any) => ({
  checkDeviceAssignedAction: (data: any, callback: any) =>
    dispatch(checkDeviceAssignedRequestAction(data, callback)),
  getDevicePlanAction: (data: any) =>
    dispatch(getDevicePlanRequestAction(data)),
  getTokenForPaymentAction: data =>
    dispatch(getTokenForPaymentRequestAction(data)),
  updateStore: (data: any) => dispatch(updateStore(data)),
  addDeviceAction: (data, formData, account_id, paymentData, callback) =>
    dispatch(
      addDeviceRequestAction(data, formData, account_id, paymentData, callback)
    ),
  braintreeDropinAction: (formData, callback) =>
    dispatch(braintreeDropInRequestAction(formData, callback)),
  fetchTrackersRequestedAction: account_id =>
    dispatch(fetchTrackersRequestedAction(account_id)),
  resetStoreAddTracker: () => dispatch(resetStoreAddTracker()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(AddTrackerContainer) as React.ComponentType;
