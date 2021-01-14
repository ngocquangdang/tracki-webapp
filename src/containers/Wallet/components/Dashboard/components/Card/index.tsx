import React from 'react';

import { useStyles } from './styles';

interface Props {
  t(key: string): string;
  title?: string;
  children: JSX.Element;
  footer?: JSX.Element;
  isHeader?: boolean;
  isFooter?: boolean;
  onViewMore?: () => void;
  className?: any;
}

export default function Card(props: Props) {
  const classes = useStyles();

  const {
    t,
    title,
    children,
    isHeader = false,
    isFooter = false,
    footer,
    className,
  } = props;

  return (
    <div className={`${classes.cardContainer} ${className}`}>
      {isHeader && (
        <div className={classes.cardHeader}>
          <p className={`${classes.mr0} ${classes.cardTitle}`}>{title}</p>
          <p className={`${classes.mr0} ${classes.cardView}`}>
            {t('wallet:see_more')}
          </p>
        </div>
      )}
      <div className={classes.cardContent}>{children}</div>
      {isFooter && <div className={classes.cardFooter}>{footer}</div>}
    </div>
  );
}
