import React from 'react';

import {
  useStyles,
  Card,
  TitleCard,
  Content,
  DataView,
  SubCard,
  SummaryDate,
} from './styles';

export default function SummaryComponent(props) {
  const classes = useStyles();
  const { summary } = props;
  return (
    <Card>
      <TitleCard>{summary.title}</TitleCard>
      <Content>
        <DataView>
          {summary.dataView}{' '}
          <span className={classes.unitSize}>{summary.unit}</span>
        </DataView>
        <SubCard>{summary.subTitle}</SubCard>
        <SummaryDate>{summary.date}</SummaryDate>
      </Content>
    </Card>
  );
}
