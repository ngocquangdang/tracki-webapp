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
  console.log('MainLayout -> props', props);
  const { isMobile, header, children, noFooter } = props;
  if (isMobile) {
    return (
      <LayoutMobile t={children.props.t} header={header} noFooter={noFooter}>
        {children}
      </LayoutMobile>
    );
  }

  return <LayoutPC>{children}</LayoutPC>;
}

export { MainLayout };
