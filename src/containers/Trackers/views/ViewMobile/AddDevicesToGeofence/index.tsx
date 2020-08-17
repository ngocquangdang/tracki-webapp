import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Slide } from '@material-ui/core';

import { HeaderSecondary } from '@Layouts';
// import { Button } from '@Components/buttons';
// import {} from '@Containers/Trackers/store/actions';
import { IGeofence } from '@Interfaces';
import { useStyles } from './styles';

interface Props {
  geofence: IGeofence;
  show: boolean;
  isMobile: boolean;
  onClose: () => void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function AddDevicesToGeofence(props: Props) {
  const classes = useStyles();
  const {
    show,
    geofence,
    t,
    onClose,
    // createNewGeofence,
  } = props;

  return (
    <React.Fragment>
      <Slide direction="right" in={show} mountOnEnter unmountOnExit>
        <div className={classes.container}>
          <HeaderSecondary
            title={t('tracker:add_device_to', { text: geofence.name })}
            onLeftClick={onClose}
          />
          <div className={classes.content}>xxsa ask asd</div>
        </div>
      </Slide>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AddDevicesToGeofence);
