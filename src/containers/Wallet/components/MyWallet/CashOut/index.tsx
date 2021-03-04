import dynamic from 'next/dynamic';
import React from 'react';
const CashOutPC = dynamic(() => import('./PC'));
const CashOutSP = dynamic(() => import('./SP'));

function CashOut(props) {
  const { isMobile } = props;

  return (
    <div>{isMobile ? <CashOutSP {...props} /> : <CashOutPC {...props} />}</div>
  );
}

export default CashOut;
