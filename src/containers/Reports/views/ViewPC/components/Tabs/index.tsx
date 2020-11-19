import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';

import { TAB_KEYS } from '@Containers/Reports/store/constants';

import { useStyles } from './styles';

interface Props {
  viewMode: string;
  changeReportView(mode: string): void;
  [data: string]: any;
}

export default function TabsPC(props: Props) {
  const { changeReportView } = props;

  const classes = useStyles();
  const [currentTab, setTab] = useState<number>(0);

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
    changeReportView(TAB_KEYS[newValue]);
  };

  return (
    <div className={classes.paper}>
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
  );
}
