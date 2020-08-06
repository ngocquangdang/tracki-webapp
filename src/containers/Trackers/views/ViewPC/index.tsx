import React, { useState } from 'react';
import { isEmpty } from 'lodash';

import { SideBarInnerPC } from '@Components/sidebars';
import Map from '@Components/Maps';
import SingleTracker from '@Containers/SingleTracker';
import MapToolBars from '@Components/Maps/components/MapToolBar';
import Tabs from '../Tabs';

import { Container, MapView } from './styles';

export default function TrackersContainer(props: any) {
  const { onResetSelectedTrackerID, ...rest } = props;
  const [isOpenSidebar, setOpenSidebar] = useState(true);

  const toggleSideBar = () => {
    if (!isOpenSidebar) {
      if (rest.selectedTrackerId) {
        const { lat, lng } = rest.trackers[rest.selectedTrackerId];
        if (!!lat && !!lng) {
          window.mapEvents.setCenterFlyTo({ lat, lng }, { speed: 1, zoom: 15 });
        }
      } else if (!isEmpty(rest.trackers)) {
        const coords = Object.values(rest.trackers).filter(
          ({ lat, lng }: any) => !!lat && !!lng
        );
        if (coords.length > 0) {
          if (window.mapType === 'mapbox') {
            window.mapEvents.setFitBounds(coords);
            window.mapEvents.setPadding({ left: 340 });
          } else {
            window.mapEvents?.map?.mapApi?.fitBounds(coords, {
              paddingTopLeft: [440, 0],
              paddingBottomRight: [100, 0],
            });
          }
        }
      }
    }
    setOpenSidebar(!isOpenSidebar);
  };

  const openSideBar = () => setOpenSidebar(true);

  const handleClickBack = () => {
    onResetSelectedTrackerID();
    const obj = rest.trackers || {};
    const coords = Object.values(obj).filter(
      ({ lat, lng }: any) => !!lat && !!lng
    );
    if (coords.length > 0) {
      if (window.mapType === 'mapbox') {
        window.mapEvents.setFitBounds(coords);
      } else {
        isOpenSidebar &&
          window.mapEvents?.map?.mapApi?.fitBounds(coords, {
            paddingTopLeft: [440, 0],
            paddingBottomRight: [100, 0],
          });
      }
    }
  };

  return (
    <Container>
      <SideBarInnerPC opened={isOpenSidebar} onChange={toggleSideBar}>
        {rest.selectedTrackerId ? (
          <SingleTracker
            tracker={rest.trackers[rest.selectedTrackerId]}
            onClickBack={handleClickBack}
            t={rest.t}
          />
        ) : (
          <Tabs {...rest} />
        )}
      </SideBarInnerPC>
      <MapView>
        <Map
          mapType="leaflet"
          fullWidth={!isOpenSidebar}
          openSideBar={openSideBar}
          {...rest}
        />
        <MapToolBars t={rest.t} />
      </MapView>
    </Container>
  );
}
