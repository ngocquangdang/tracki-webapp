import React from 'react';

import UnReadNotiCard from '@Components/Skeletons/Report/ReportCardMobile';
import Row from '../../Row';

//styles
import { useStyles } from './styles';
function StopsTable(props) {
  const { datas, dataIds, typeCard, isFetching, t } = props;
  const classes = useStyles();
  return (
    <div className={classes.pd}>
      {isFetching ? (
        <div>
          {[1, 2, 3, 4, 5].map(index => (
            <UnReadNotiCard key={index} />
          ))}
        </div>
      ) : dataIds && dataIds.length > 0 ? (
        dataIds.map(id => (
          <Row
            typeCard={typeCard}
            data={datas[id]}
            key={id}
            t={t}
            mapId={`map${id}`}
            isStopTab={true}
          />
        ))
      ) : (
        <div className={classes.flexCenter}>{t('common:no_records_found')}</div>
      )}
    </div>
  );
}

export default StopsTable;
