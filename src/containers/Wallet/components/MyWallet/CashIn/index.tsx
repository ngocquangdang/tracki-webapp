import React from 'react';
import dynamic from 'next/dynamic';

const CashInSP = dynamic(() => import('./CashInSP'));
const CashInPC = dynamic(() => import('./CashInPC'));

function CashIn(props) {
  const { isMobile } = props;

  return <>{isMobile ? <CashInSP {...props} /> : <CashInPC {...props} />}</>;
}
export default CashIn;
