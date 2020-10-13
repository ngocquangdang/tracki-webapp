import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import {
  makeSelectSnackShow,
  makeSelectSnackType,
  makeSelectSnackMessage,
} from './store/selectors';
import { clearSnackbar } from './store/actions';

import { useInjectReducer } from '@Utils/injectReducer';
import reducer from './store/reducers';

interface Props {
  show: boolean;
  isMobile: boolean;
  snackType: 'success' | 'error' | 'info' | 'warning';
  snackMessage: string;
  clearSnackbar(): void;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackContainer(props: Props) {
  useInjectReducer({ key: 'snack', reducer });
  const { show, isMobile, snackType, snackMessage, clearSnackbar } = props;
  const vertical = isMobile ? 'bottom' : 'top';
  const horizontal = isMobile ? 'center' : 'right';

  return (
    <Snackbar
      open={show}
      autoHideDuration={5000}
      onClose={clearSnackbar}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={clearSnackbar} severity={snackType}>
        {snackMessage}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = createStructuredSelector({
  show: makeSelectSnackShow(),
  snackType: makeSelectSnackType(),
  snackMessage: makeSelectSnackMessage(),
});

const mapDispatchToProps = (dispatch: any) => ({
  clearSnackbar: () => dispatch(clearSnackbar()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(SnackContainer);
