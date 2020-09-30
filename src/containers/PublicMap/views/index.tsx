import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Header, Container, Image } from './styles';

const MapCard = dynamic(
  () => import('@Containers/Tracking/views/ViewPC/components/MapCard'),
  {
    ssr: false,
  }
);

export default function PublicMapContainer(props) {
  const { trackers, trackerSelected } = props;

  return (
    <>
      <Header>
        <Link href="/">
          <Image src={'/images/logo.png'} alt=""></Image>
        </Link>
      </Header>
      <Container>
        {trackers && Object.keys(trackers).length > 0 && (
          <MapCard
            mapId="publicMap"
            mapType="leaflet"
            isTracking={true}
            trackers={trackers}
            selectedTrackerId={trackerSelected}
            {...props}
          />
        )}
      </Container>
    </>
  );
}
