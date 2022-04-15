import React from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';

import {
  MapViewCard,
  HeaderCard,
  useStyles,
  CardTitle,
  Description,
  ContentCard,
  MapView,
} from './styles';

import Map from '@Components/Maps';
import ToolBar from '@Containers/Dasboard/views/components/MapCard/MapToolBarPC';

const MapCard = dynamic(
  () => import('@Containers/Dasboard/views/components/MapCard'),
  { ssr: false }
);

export default function MapViewComponent(props) {
  const classes = useStyles();
  const { trackerSelected, t, trackingIds } = props;

  return (
    <MapViewCard>
      <HeaderCard>
        <CardTitle>
          <div className={`${classes.color} ${classes.cellHeader}`}>
            <FaMapMarkerAlt className={classes.iconCard} />
            {t('dashboard:current_position')}
          </div>
        </CardTitle>
        <Description>
          <GoPrimitiveDot
            className={
              trackerSelected?.status === 'active'
                ? classes.primaryColor
                : classes.secondaryColor
            }
          />{' '}
          {t('dashboard:online')} |{' '}
          {t('dashboard:last_update', {
            date: trackerSelected
              ? moment(trackerSelected.time * 1000).format('lll')
              : 'N/A',
          })}
        </Description>
      </HeaderCard>
      <ContentCard>
        <MapView>
          {trackingIds && trackingIds.length > 0 ? (
            <>
              <MapCard
                mapId="isDashboard"
                selectedTrackerId={trackerSelected?.device_id}
                mapType="leaflet"
                {...props}
              />
            </>
          ) : (
            <React.Fragment>
              <Map
                fullWidth={true}
                showTrackerName={true}
                mapType="leaflet"
                {...props}
              />
              <ToolBar {...props} />
            </React.Fragment>
          )}
        </MapView>
      </ContentCard>
    </MapViewCard>
  );
}
