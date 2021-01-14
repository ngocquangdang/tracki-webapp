import React from 'react';
import Card from '../Card';

interface Props {
  t(key: string): string;
}

export default function PointHistory(props: Props) {
  const { t } = props;
  return (
    <Card t={t} isHeader={true} title={t('wallet:point_history')}>
      <>xxx</>
    </Card>
  );
}
