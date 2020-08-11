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
  snackType: 'success' | 'error' | 'info' | 'warning';
  snackMessage: string;
  clearSnackbar(): void;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackContainer(props: Props) {
  useInjectReducer({ key: 'snack', reducer });
  const { show, snackType, snackMessage, clearSnackbar } = props;

  return (
    <Snackbar
      open={show}
      autoHideDuration={5000}
      onClose={clearSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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

export default withConnect(SnackContainer) as React.ComponentType;
