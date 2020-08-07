import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { ViewPC, ViewMobile } from './views';
import { MainLayout } from '@Layouts';

interface Props {
  [data: string]: any;
}

function View(props: Props) {
  const { selectTrackerAction, trackers } = props;
  const {
    query: { id: trackerId },
  } = useRouter();

  useEffect(() => {
    if (trackerId && trackers[trackerId.toString()]) {
      selectTrackerAction(trackerId);
    }
  }, []);

  return (
    <MainLayout isMobile={props.isMobile}>
      {props.isMobile ? <ViewMobile {...props} /> : <ViewPC {...props} />}
    </MainLayout>
  );
}

export default View;
