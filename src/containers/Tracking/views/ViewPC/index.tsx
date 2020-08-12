import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { SideBarInnerPC } from '@Components/sidebars';
import Map from '@Components/Maps';
import MapToolBars from '@Components/Maps/components/MapToolBar';
import Tabs from './components/Tabs';
import { Container, MapView } from './styles';

const MultiView = dynamic(() => import('./components/MultiView'), {
  ssr: false,
});

interface Props {
  isMobile: boolean;
  viewMode: string;
  trackingIds: number[];
  trackers: object;
  changeTrackingView(mode: string): void;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  onResetSelectedTrackerID(): void;
  [data: string]: any;
  getHistoryTracker(data: object): void;
}

export default function TrackingContainer(props: Props) {
  const { viewMode, onResetSelectedTrackerID, ...rest } = props;
  const [isOpenSidebar, setOpenSidebar] = useState(true);

  const toggleSideBar = () => {
    setOpenSidebar(!isOpenSidebar);
  };

  useEffect(() => {
    window.mapFullWidth = false;
  }, []);

  const openSideBar = () => setOpenSidebar(true);
  const isMultiView = ['multi_view', 'multi_screen'].includes(viewMode);

  return (
    <Container>
      <SideBarInnerPC opened={isOpenSidebar} onChange={toggleSideBar}>
        <Tabs {...rest} />
      </SideBarInnerPC>
      <MapView isMultiView={isMultiView} isFull={!isOpenSidebar}>
        {viewMode === 'single_view' && (
          <React.Fragment>
            <Map
              mapType="leaflet"
              openSideBar={openSideBar}
              isTracking={true}
              {...rest}
            />
            <MapToolBars t={rest.t} />
          </React.Fragment>
        )}
        {isMultiView && (
          <MultiView
            isFullWidth={!isOpenSidebar}
            trackers={rest.trackers}
            trackingIds={rest.trackingIds}
            t={rest.t}
            viewMode={viewMode}
            isMultiScreen={viewMode === 'multi_screen'}
            changeTrackersTracking={rest.changeTrackersTracking}
          />
        )}
      </MapView>
    </Container>
  );
}
