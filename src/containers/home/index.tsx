import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { withTranslation } from '@Server/i18n';
import saga from './trackers/store/sagas';
import reducer from './trackers/store/reducers';
import { getDeviceRequestAction } from './trackers/store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectDivices,
} from './trackers/store/selectors';

import { ViewHomePC, ViewHomeMobile } from './views';
import { MainLayoutMobile, MainLayout } from '@Layouts';
interface Props {
  userAgent?: string;
  getDevcieRequest: any;
}
function SettingContainer(props: Props) {
  useInjectSaga({ key: 'device', saga });
  useInjectReducer({ key: 'device', reducer });
  const { getDevcieRequest, userAgent } = props;

  const isMobile = Boolean(
    userAgent?.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  useEffect(() => {
    getDevcieRequest();
  }, [getDevcieRequest]);

  return isMobile ? (
    <MainLayoutMobile>
      <ViewHomeMobile />
    </MainLayoutMobile>
  ) : (
    <MainLayout>
      <ViewHomePC />
    </MainLayout>
  );
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  errorMessage: makeSelectErrorMessage(),
  devices: makeSelectDivices(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDevcieRequest: (data: any) => dispatch(getDeviceRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(SettingContainer) as React.ComponentType;
