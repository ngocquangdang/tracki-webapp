import React from 'react';
import dynamic from 'next/dynamic';

const CashOutSP = dynamic(() => import('./CashOutSP'));
const CashOutPC = dynamic(() => import('./CashOutPC'));

function CashOut(props) {
  const { isMobile } = props;

  return <>{isMobile ? <CashOutSP {...props} /> : <CashOutPC {...props} />}</>;
}
export default CashOut;
