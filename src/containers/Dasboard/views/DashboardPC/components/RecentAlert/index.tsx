import React, { useCallback, useState, useEffect } from 'react';
import moment from 'moment';
import { getAddress } from '@Utils/helper';

import { useStyles } from './styles';
import { FaBell } from 'react-icons/fa';

export default function RecentAlertComponent(props) {
  const classes = useStyles();
  const { alarms, alarmIds, t } = props;
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const onUpdateRowPerPage = () => {
    setPage(page + 1);
  };

  function SetAlarmRow({ rowAlert }) {
    const [dataAddress, setDataAddress] = useState('');

    const callApiGetAddress = useCallback(async () => {
      if (rowAlert && !!rowAlert.lat && !!rowAlert.lng) {
        const address = await getAddress(rowAlert);
        setDataAddress(address);
      } else {
        setDataAddress('Unknow location');
      }
    }, [setDataAddress, rowAlert]);

    useEffect(() => {
      callApiGetAddress();
    }, [callApiGetAddress]);

    return (
      <tr className={classes.flexbox}>
        <td
          className={`${classes.color} ${classes.font14} ${classes.colItem1}`}
        >
          {moment(rowAlert.created).format('lll')}
        </td>
        <td
          className={`${classes.color} ${classes.font14} ${classes.colItem1} `}
        >
          {rowAlert.message || '-'}
        </td>
        <td
          className={`${classes.color} ${classes.font14} ${classes.colItem2} `}
        >
          {dataAddress}
        </td>
      </tr>
    );
  }

  return (
    <>
      <div className={`${classes.color} ${classes.header}`}>
        <FaBell className={classes.iconCard} />
        {t('dashboard:recent_alerts')}
      </div>
      <table className={classes.fullWidth}>
        <thead>
          <tr className={`${classes.rowHeader}`}>
            <th className={`${classes.color} ${classes.colHeader1}`}>
              {t('dashboard:when')}
            </th>
            <th className={`${classes.color} ${classes.colHeader1}`}>
              {t('dashboard:description')}
            </th>
            <th className={`${classes.color} ${classes.colHeader2}`}>
              {t('dashboard:address')}
            </th>
          </tr>
        </thead>
        <tbody className={classes.overflow}>
          {alarmIds && alarmIds.length > 0 ? (
            (rowsPerPage > 0
              ? alarmIds.slice(0, page * rowsPerPage + rowsPerPage)
              : alarmIds
            ).map((item, index) => (
              <SetAlarmRow rowAlert={alarms[item]} key={index} />
            ))
          ) : (
            <tr>
              <td
                className={`${classes.font14} ${classes.fullWidth} ${classes.noAlert} `}
              >
                Have not Alert of Device
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className={classes.footer} onClick={onUpdateRowPerPage}>
            <td>{t('dashboard:load_more_alerts')}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
