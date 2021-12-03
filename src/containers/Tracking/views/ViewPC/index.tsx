import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { SideBarInnerPC } from '@Components/sidebars';
import Map from '@Components/Maps';
import MapToolBars from '@Components/Maps/components/MapToolBar';
import Tabs from './components/Tabs';
import { Container, MapView, Progress } from './styles';
import { firebaseLogEventRequest } from '@Utils/firebase';
import { CircularProgress } from '@material-ui/core';

const MultiView = dynamic(() => import('./components/MultiView'), {
  ssr: false,
});

interface Props {
  isMobile: boolean;
  viewMode: string;
  trackingIds: number[];
  trackers: object;
  settings: object;
  isLoading?: boolean;
  changeTrackingView(mode: string): void;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  onResetSelectedTrackerID(): void;
  getHistoryTracker(data: object): void;
  refreshLocation(data: object): void;
  isLoadingTracking: boolean;
  [data: string]: any;
}

export default function TrackingContainer(props: Props) {
  const { onResetSelectedTrackerID, isLoadingTracking, ...rest } = props;
  const [isOpenSidebar, setOpenSidebar] = useState(true);

  const toggleSideBar = () => {
    setOpenSidebar(!isOpenSidebar);
    firebaseLogEventRequest(
      'main_page',
      !isOpenSidebar ? 'tongle_open_sidebar' : 'tongle_close_sidebar'
    );
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  useEffect(() => {
    window.mapFullWidth = false;
  }, []);

  const openSideBar = () => setOpenSidebar(true);
  const isMultiView = ['multi_view', 'multi_screen'].includes(rest.viewMode);

  return (
    <Container>
      <SideBarInnerPC opened={isOpenSidebar} onChange={toggleSideBar}>
        <Tabs {...rest} />
      </SideBarInnerPC>
      <MapView isMultiView={isMultiView} isFull={!isOpenSidebar}>
        {!isMultiView && (
          <React.Fragment>
            <Map
              mapType="leaflet"
              openSideBar={openSideBar}
              isTracking={true}
              {...rest}
            />
            <MapToolBars t={rest.t} />
            {isLoadingTracking && (
              <Progress isFull={isOpenSidebar}>
                <CircularProgress size={50} color="primary" />
              </Progress>
            )}
          </React.Fragment>
        )}
        {isMultiView && (
          <MultiView
            isFullWidth={!isOpenSidebar}
            trackers={rest.trackers}
            trackingIds={rest.trackingIds}
            t={rest.t}
            settings={rest.settings}
            viewMode={rest.viewMode}
            isMultiScreen={rest.viewMode === 'multi_screen'}
            changeTrackersTracking={rest.changeTrackersTracking}
          />
        )}
      </MapView>
    </Container>
  );
}
