import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { withTranslation } from '@Server/i18n';
import saga from './store/sagas';
import reducer from './store/reducers';
import { getUserRequestAction, updateUserRequestAction } from './store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectUserProfile,
} from './store/selectors';
import UserDetail from './interfaces';

import View from './views';

function SettingContainer(props: UserDetail.IProps) {
  useInjectSaga({ key: 'global', saga });
  useInjectReducer({ key: 'global', reducer });

  const { getUserRequestAction } = props;

  useEffect(() => {
    getUserRequestAction();
  }, [getUserRequestAction]);

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  errorMessage: makeSelectErrorMessage(),
  profile: makeSelectUserProfile(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getUserRequestAction: (data: UserDetail.IStateUser) =>
    dispatch(getUserRequestAction(data)),
  updateUSerRequestAction: (data: UserDetail.IStateUser, id: number) =>
    dispatch(updateUserRequestAction(data, id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(SettingContainer) as React.ComponentType;
