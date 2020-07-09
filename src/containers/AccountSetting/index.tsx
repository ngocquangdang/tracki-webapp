import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { withTranslation } from '@Server/i18n';
import saga from './store/sagas';
import reducer from './store/reducers';
import { getUserRequestAction } from './store/actions';

import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
} from './store/selectors';
import UserDetail from './interfaces';

import View from './views';

function SettingContainer(props: UserDetail.IProps) {
  useInjectSaga({ key: 'user', saga });
  useInjectReducer({ key: 'user', reducer });

  useEffect(() => {
    const { getUserRequestAction } = props;
    getUserRequestAction({});
  }, []);
  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  errorMessage: makeSelectErrorMessage(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getUserRequestAction: (data: UserDetail.IStateUser) =>
    dispatch(getUserRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(SettingContainer) as React.ComponentType;
