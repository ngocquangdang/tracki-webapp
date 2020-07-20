import React from 'react';
import dynamic from 'next/dynamic';

const LayoutPC = dynamic(() => import('./LayoutPC'));
const LayoutMobile = dynamic(() => import('./LayoutMobile'));

interface Props {
  isMobile?: boolean;
  noFooter?: boolean;
  header?: JSX.Element;
  children: any;
}

function MainLayout(props: Props) {
  const { isMobile, header, children, noFooter } = props;
  if (isMobile) {
    return (
      <LayoutMobile header={header} noFooter={noFooter}>
        {children}
      </LayoutMobile>
    );
  }

  return <LayoutPC>{children}</LayoutPC>;
}

export { MainLayout };
