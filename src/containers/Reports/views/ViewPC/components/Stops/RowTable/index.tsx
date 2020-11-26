import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { TableCell, TableRow } from '@material-ui/core';
import {
  LocationOn as LocationIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@material-ui/icons';
import ReportStopSkeleton from '@Components/Skeletons/Report/ReportStopSkeleton';
import { getAddress, msToTime } from '@Utils/helper';

import { useStyles } from './styles';

const MapCard = dynamic(
  () => import('@Containers/Reports/views/components/MapCard'),
  {
    ssr: false,
  }
);

type History = {
  lat: number;
  lng: number;
  stopOn: number;
  startOn: number;
  duration: number;
};

interface Props {
  historyStops: History;
  mapId: string;
  t(key: string, format?: object): string;
}

function RowTable(props: Props) {
  const classes = useStyles();
  const { historyStops, mapId, t } = props;
  const [loading, setLoading] = useState(true);
  const [address, updateAddress] = useState<string | null>(null);
  const [isExpand, setExpand] = useState(false);

  const callApiGetAddress = useCallback(async () => {
    const address = await getAddress(historyStops);
    updateAddress(address);
    setLoading(false);
  }, [updateAddress, setLoading, historyStops]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const onClickExpand = () => {
    setExpand(!isExpand);
  };

  return loading ? (
    <ReportStopSkeleton />
  ) : (
    <>
      <TableRow className={classes.rowContainer}>
        <TableCell className={classes.contentBody}>
          {moment(historyStops?.stopOn).format('DD/MM/YYYY hh:mm A')}
        </TableCell>
        <TableCell className={classes.contentBody}>
          {moment(historyStops?.stopOn).format('DD/MM/YYYY hh:mm A')}
        </TableCell>
        <TableCell className={classes.contentBody}>
          {msToTime(historyStops?.duration)}
        </TableCell>
        <TableCell className={classes.contentBody}>
          <div className={classes.flexRow}>
            <div className={classes.location}>
              <LocationIcon className={classes.iconLocation} />
              <div>{address}</div>
            </div>
            <div className={isExpand ? classes.expand : classes.noExpand}>
              <ArrowForwardIosIcon onClick={onClickExpand} />
            </div>
          </div>
        </TableCell>
      </TableRow>
      {isExpand && (
        <TableRow>
          <TableCell colSpan={6} className={classes.cellMap}>
            <MapCard
              mapId={mapId}
              tracker={historyStops}
              mapType="leaflet"
              isMobile={true}
              t={t}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default RowTable;
