import React from 'react';
// import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Slide from '@material-ui/core/Slide';
import {
  ArrowBackIos as ArrowBackIosIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import { Button } from '@Components/buttons';

import { useStyles } from './styles';
import { ITracker } from '@Interfaces';

interface Props {
  tracker?: ITracker;
  fences?: object;
  contacts?: object;
  geofences?: object;
  onClickBack: () => void;
  show: boolean;
  t?(key: string): string;
}

function SingleTrackerGeofences(props: Props) {
  const classes = useStyles();
  const { show, onClickBack } = props;

  const onAddFence = () => {
    console.log('____onAddFence');
  };

  return (
    <Slide direction="right" in={show} mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <div className={classes.header}>
          <Button
            text="Back"
            onClick={onClickBack}
            className={clsx(classes.headBtn, classes.backBtn)}
            startIcon={<ArrowBackIosIcon className={classes.iconBack} />}
          />
          <Button
            text="Fence"
            color="primary"
            variant="outlined"
            className={clsx(classes.headBtn)}
            onClick={onAddFence}
            startIcon={<AddIcon className={classes.iconBack} />}
          />
        </div>
      </div>
    </Slide>
  );
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SingleTrackerGeofences);
