import React from 'react';
import dynamic from 'next/dynamic';

const LayoutPC = dynamic(() => import('./LayoutPC'));
const LayoutMobile = dynamic(() => import('./LayoutMobile'));

interface Props {
  isMobile?: boolean;
  hasFooter?: boolean;
  header?: JSX.Element;
  children: any;
}

function MainLayout(props: Props) {
  const { isMobile, header, children, hasFooter = true } = props;
  if (isMobile) {
    return (
      <LayoutMobile
        t={children.props.t}
        header={header}
        hasFooter={hasFooter}
        trackers={children.props.trackers}
      >
        {children}
      </LayoutMobile>
    );
  }

  return <LayoutPC>{children}</LayoutPC>;
}

export { MainLayout };
