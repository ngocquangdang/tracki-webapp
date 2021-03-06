import React from 'react';

import Row from '../Row';
import ReportRowCard from '@Components/Skeletons/Report/ReportCardPC';

import { useStyles } from './styles';

function Card(props) {
  const {
    iconHeader,
    label,
    rightItemHead,
    typeCard,
    datas,
    dataIds,
    isFetching,
    t,
  } = props;

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.leftItemHead}>
          {iconHeader}
          <div>{label}</div>
        </div>
        {rightItemHead && <div>{rightItemHead}</div>}
      </div>
      <div className={classes.content}>
        {isFetching ? (
          <div>
            {[1, 2, 3, 4, 5].map(index => (
              <ReportRowCard key={index} />
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
