import React from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import { useStyles } from './styles';

interface Props {
  removeGeofence(): void;
  onClose(): void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function AddGeoFence(props: Props) {
  const classes = useStyles();
  const { onClose, isRequesting, isMobile, t, show, removeGeofence } = props;

  return (
    <SideBarOutside
      title=""
      show={show}
      direction="right"
      handleClose={onClose}
      isMobile={isMobile || false}
    >
      <div
        className={clsx(classes.container, {
          [classes.containerMobile]: isMobile,
        })}
      >
        <div className={classes.content}>
          <Typography className={classes.text}>
            {t('tracker:delete_geofence_confirm')}
          </Typography>
          <Button
            text={t('common:confirm')}
            onClick={removeGeofence}
            color="primary"
            disabled={isRequesting}
            fullWidth={true}
            variant="contained"
          />
          <div className={classes.space} />
          <Button
            text={t('common:cancel')}
            onClick={onClose}
            fullWidth={true}
            variant="contained"
          />
        </div>
      </div>
    </SideBarOutside>
  );
}

export default AddGeoFence;
