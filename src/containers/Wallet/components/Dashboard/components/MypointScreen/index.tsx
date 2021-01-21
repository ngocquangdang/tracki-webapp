import React from 'react';
import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';
import { useStyles } from './styles';

interface Props {
  t(key: string, format?: object): string;
}

export default function MyPoint(props: Props) {
  const classes = useStyles();

  const { t } = props;
  return (
    <DetailPageContainer title={t('wallet:my_points')}>
      <div className={classes.container}>
        <div className={classes.header}></div>
        <div className={classes.content}></div>
      </div>
    </DetailPageContainer>
  );
}
