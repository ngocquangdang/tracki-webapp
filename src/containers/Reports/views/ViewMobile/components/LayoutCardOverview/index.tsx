import React from 'react';
import { uniq } from 'lodash';

import Row from '../Row';
import UnReadNotiCard from '@Components/Skeletons/Report/ReportCardMobile';

import { useStyles } from './styles';

function Card(props) {
  const {
    iconHeader,
    label,
    rightItemHead,
    typeCard,
    datas,
    dataIds = [],
    isFetching,
    t,
  } = props;

  const newListTrackerIds = uniq<number>(dataIds);

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.leftItemHead}>
          {iconHeader}
          <span className={classes.label}>{label}</span>
        </div>
        {rightItemHead && <div>{rightItemHead}</div>}
      </div>
      <div className={classes.content}>
        {isFetching ? (
          <div>
            {[1, 2, 3, 4, 5].map(index => (
              <UnReadNotiCard key={index} />
            ))}
          </div>
        ) : newListTrackerIds.length > 0 ? (
          newListTrackerIds.map(id => (
            <Row
              typeCard={typeCard}
              data={datas[id]}
              key={id}
              t={t}
              mapId={`map${id}`}
            />
          ))
        ) : (
          <div className={classes.flexCenter}>
            {t('common:no_records_found')}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
