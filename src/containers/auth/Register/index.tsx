import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import dynamic from 'next/dynamic';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import saga from './store/sagas';
import reducer from './store/reducers';
import { registerRequestAction, resetFormData } from './store/actions';
import { updateStore } from './store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectErrorMessageKey,
  selectFormData,
} from './store/selectors';
import IRegisterPage from './interfaces';

const View = dynamic(() => import('./view'));

function Register(props: IRegisterPage.IProps) {
  useInjectSaga({ key: 'register', saga });
  useInjectReducer({ key: 'register', reducer });

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  errorMessage: makeSelectErrorMessage(),
  errorMessageKey: makeSelectErrorMessageKey(),
  formData: selectFormData(),
});

const mapDispatchToProps = (dispatch: any) => ({
  registerRequestAction: (data: IRegisterPage.RegisterState, callback: any) =>
    dispatch(registerRequestAction(data, callback)),
  updateStore: (data: IRegisterPage.RegisterFormStep1) =>
    dispatch(updateStore(data)),
  resetFormData: () => dispatch(resetFormData()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Register) as React.ComponentType;
