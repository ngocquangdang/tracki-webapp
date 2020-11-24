import React, { useEffect, useState, useCallback, Fragment } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { TableCell, TableRow } from '@material-ui/core';
import { LocationOn as LocationIcon } from '@material-ui/icons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { SkeletonTracker } from '@Components/Skeletons';
import { getAddress } from '@Utils/helper';
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
  time: number;
  speed: number;
  speed_unit: string;
  battery: number;
};

interface Props {
  historyLogs: History;
  mapId: string;
  t(key: string, format?: object): string;
}

function RowTable(props: Props) {
  const classes = useStyles();
  const { historyLogs, mapId, t } = props;
  const [loading, setLoading] = useState(true);
  const [address, updateAddress] = useState<string | null>(null);
  const [isExpand, setExpand] = useState(false);

  const callApiGetAddress = useCallback(async () => {
    const address = await getAddress(historyLogs);
    updateAddress(address);
    setLoading(false);
  }, [updateAddress, setLoading, historyLogs]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const onClickExpand = () => {
    setExpand(!isExpand);
  };

  return (
    <TableRow className={classes.rowContainer}>
      <TableCell className={classes.contentBody}>
        {loading || (!historyLogs?.lat && !historyLogs?.lng) ? (
          <div className={classes.skeContainer}>
            <SkeletonTracker />
          </div>
        ) : (
          <Fragment>
            <div className={classes.flexCol1}>
              <div className={classes.textFont17}>
                {moment(historyLogs?.time * 1000).format('DD/MM/YYYY hh:mm A')}
              </div>
              <div className={classes.location}>
                <LocationIcon className={classes.iconLocation} />
                <div className={classes.textFont17}>{address}</div>
              </div>
            </div>
            <div className={classes.flexRow}>
              {`${historyLogs?.speed === 0 ? 'Not moving' : 'Moving'} - ${
                historyLogs?.speed
              } ${historyLogs?.speed_unit}`}
            </div>
            <div className={classes.flexRow2}>
              <img
                className={classes.iconBattery}
                alt=""
                src="/images/icon-battery.png"
              />
              <span>Battery Life - {historyLogs?.battery || '[N/A]'} %</span>
            </div>
            <div className={isExpand ? classes.expand : classes.noExpand}>
              <ArrowForwardIosIcon onClick={onClickExpand} />
            </div>
          </Fragment>
        )}
      </TableCell>
      {isExpand && (
        <TableCell className={classes.cellMap}>
          <MapCard
            mapId={mapId}
            tracker={historyLogs}
            mapType="leaflet"
            isMobile={true}
            t={t}
          />
        </TableCell>
      )}
    </TableRow>
  );
}

export default RowTable;
