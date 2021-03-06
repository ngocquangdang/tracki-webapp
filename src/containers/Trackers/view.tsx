import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ViewPC, ViewMobile } from './views';
import { MainLayout } from '@Layouts';
import { firebaseLogEventRequest } from '@Utils/firebase';

interface Props {
  getHistoryTracker(data: object): void;
  t(key: string, format?: object): string;
  refreshLocation(data: object): void;
  [data: string]: any;
}

function View(props: Props) {
  const { selectTrackerAction, trackers } = props;
  const [isSelected, setIsSelected] = useState(false);
  const {
    query: { id: trackerId },
  } = useRouter();

  useEffect(() => {
    if (trackerId && trackers[trackerId.toString()] && !isSelected) {
      firebaseLogEventRequest('trackers_page', 'device_detail');
      selectTrackerAction(trackerId);
      setIsSelected(true);
    }
  }, [trackers, selectTrackerAction, trackerId, isSelected]);

  return (
    <MainLayout isMobile={props.isMobile}>
      {props.isMobile ? <ViewMobile {...props} /> : <ViewPC {...props} />}
    </MainLayout>
  );
}

export default View;
