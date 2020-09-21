import React from 'react';
import Link from 'next/link';
import { Button } from '@Components/buttons';
import { IoMdPin } from 'react-icons/io';

import {
  Congratulation,
  CongratulationTitle,
  CongratulationSubTitle,
  CongratulationTracker,
  CongratulationIcon,
  CongratulationContent,
  ImageDevice,
  useStyles,
} from './styles';

export default function CongratulationContainer(props) {
  const classes = useStyles();
  const {
    fetchTrackersRequestedAction,
    account_id,
    resetStoreAddTracker,
    formData,
  } = props;
  const onViewTracker = () => {
    window.dropinIntance = {};
    fetchTrackersRequestedAction(account_id);
    resetStoreAddTracker();
  };
  return (
    <>
      <Congratulation>
        <CongratulationTitle>
          {props.t('tracker:congratulations')}
        </CongratulationTitle>
        <CongratulationSubTitle>
          {props.t('tracker:congratulation_subscription')}
          <br />
          {props.t('tracker:view_tracker')}
        </CongratulationSubTitle>
        <CongratulationContent>
          <CongratulationIcon>
            {formData.icon_url ? (
              <ImageDevice background={formData.icon_url} />
            ) : (
              <IoMdPin className={classes.icon} />
            )}
          </CongratulationIcon>
          <CongratulationTracker>{formData.device_name}</CongratulationTracker>
          <Link href="/">
            <Button
              onClick={onViewTracker}
              color="primary"
              type="submit"
              variant="contained"
              text={props.t('tracker:view_tracker_on_map')}
              className={classes.widthBtn}
            />
          </Link>
        </CongratulationContent>
      </Congratulation>
    </>
  );
}
