import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Slide, IconButton } from '@material-ui/core';
import { Done as DoneIcon } from '@material-ui/icons';

import { HeaderSecondary } from '@Layouts';
// import { Button } from '@Components/buttons';
// import {} from '@Containers/Trackers/store/actions';
import { changeMapAction } from '@Containers/App/store/actions';
import { useStyles } from './styles';

interface Props {
  geofences: object;
  show: boolean;
  isMobile: boolean;
  onClose: () => void;
  t(key: string, format?: object): string;
  changeMapAction(mapAction: string): void;
  [data: string]: any;
}

function CreateGeofenceMobile(props: Props) {
  const classes = useStyles();
  const {
    show,
    // newGeofence,
    // geofences,
    t,
    onClose,
    // createNewGeofence,
  } = props;

  const onSave = () => {
    console.log('__onSave');
  };

  console.log('CreateGeofenceMobile', props);

  return (
    <React.Fragment>
      <Slide direction="left" in={show} mountOnEnter unmountOnExit>
        <div className={classes.container}>
          <HeaderSecondary
            title={t('tracker:add_geofence')}
            onLeftClick={onClose}
            rightElement={
              <IconButton onClick={onSave} className={classes.iconBtn}>
                <DoneIcon className={classes.iconBack} />
              </IconButton>
            }
          />
          <div className={classes.content}>1111</div>
        </div>
      </Slide>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => ({
  changeMapAction: (mapAction: string) => dispatch(changeMapAction(mapAction)),
});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(CreateGeofenceMobile);
