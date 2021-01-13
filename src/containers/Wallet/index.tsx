import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '@Utils/injectReducer';
import injectSaga from '@Utils/injectSaga';
import reducer from './store/reducer';
import saga from './store/sagas';

import View from './views';

function WalletContainer(props) {
  injectReducer({ key: 'wallet', reducer });
  injectSaga({ key: 'wallet', saga });

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({});
const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
  memo
)(WalletContainer) as React.ComponentType;
