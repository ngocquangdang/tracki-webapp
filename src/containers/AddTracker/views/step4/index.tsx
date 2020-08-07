import React from 'react';
import Link from 'next/link';
import { Button } from '@Components/buttons';

import {
  Congratulation,
  CongratulationTitle,
  CongratulationSubTitle,
  CongratulationTracker,
  CongratulationIcon,
  CongratulationContent,
  useStyles,
} from './styles';
import { IoMdPin } from 'react-icons/io';

export default function CongratulationContainer(props) {
  const classes = useStyles();
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
            <IoMdPin className={classes.icon} />
          </CongratulationIcon>
          <CongratulationTracker>tracker name</CongratulationTracker>
          <Link href="/trackers" />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            text={props.t('tracker:view_tracker_on_map')}
            className={classes.widthBtn}
          />
        </CongratulationContent>
      </Congratulation>
    </>
  );
}
