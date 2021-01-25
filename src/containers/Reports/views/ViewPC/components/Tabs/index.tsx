import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';

import { TAB_KEYS } from '@Containers/Reports/store/constants';
import { useStyles } from './styles';
import ReportTrip from '../Trip';

export default function TabsPC(props) {
  const { changeReportView, viewMode, ...rest } = props;

  const classes = useStyles();
  const [currentTab, setTab] = useState<number>(0);
  useEffect(() => {
    viewMode === 'overview' && setTab(0);
    viewMode === 'history' && setTab(1);
    viewMode === 'stop' && setTab(2);
    viewMode === 'trip' && setTab(3);
    viewMode === 'speed' && setTab(4);
  }, [currentTab, viewMode]);

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
    changeReportView(TAB_KEYS[newValue]);
  };

  return (
    <React.Fragment>
      <div
        className={
          viewMode === 'trip' ? classes.containerTabTrip : classes.paper
        }
      >
        <Tabs
          value={currentTab}
          onChange={onChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}
        >
          {TAB_KEYS.map((key: string, index: number) => (
            <Tab
              key={key}
              label={key}
              value={index}
              className={classes.tabItem}
            />
          ))}
        </Tabs>
      </div>
      {viewMode === 'trip' && <ReportTrip {...rest} viewMode={viewMode} />}
    </React.Fragment>
  );
}
