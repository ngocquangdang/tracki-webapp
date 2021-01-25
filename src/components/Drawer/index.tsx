import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { useStyles, DrawerStyle } from './styles';

interface Props {
  anchor: 'bottom' | 'left' | 'right' | 'top';
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: JSX.Element;
  title: string;
}
export default function DrawerPanel(props: Props) {
  const classes = useStyles();
  const { anchor, isOpen, onClose, className, children, title } = props;

  const handleClose = () => onClose();

  return (
    <DrawerStyle
      anchor={anchor}
      open={isOpen}
      onClose={onClose}
      className={className}
    >
      <div className={classes.paper}>
        <div className={classes.header}>
          <div className={classes.back} onClick={handleClose}>
            <ArrowBackIosIcon className={classes.backIcon} />
            <p className={classes.title}>{title}</p>
          </div>
        </div>
        <div className={classes.container}>{children}</div>
      </div>
    </DrawerStyle>
  );
}
