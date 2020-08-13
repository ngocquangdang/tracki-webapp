import React from 'react';
import {
  MenuWrap,
  MenuHeader,
  useStyles,
  ButtonClose,
  WrapDisabled,
  WrapTitle,
} from './style';
import { IoMdClose } from 'react-icons/io';
import { Slide } from '@material-ui/core';

interface Props {
  button?: JSX.Element;
  isBackable?: boolean;
  handleClose(): void;
  children: any;
  isMobile: boolean;
  show: boolean;
  direction?: 'left' | 'right' | 'down' | 'up';
  isLogo?: boolean;
}

export default function SideBarOut(props: Props) {
  const classes = useStyles();
  const { button, handleClose, children, isMobile, show, direction } = props;

  return (
    <Slide in={show} direction={direction || 'left'} mountOnEnter unmountOnExit>
      <MenuWrap isMobile={isMobile}>
        <WrapDisabled isMobile={isMobile}>
          <MenuHeader isMobile={isMobile}>
            <WrapTitle>{button}</WrapTitle>
            <ButtonClose onClick={handleClose}>
              <IoMdClose className={classes.buttonClose} />
            </ButtonClose>
          </MenuHeader>
          {children}
        </WrapDisabled>
      </MenuWrap>
    </Slide>
  );
}
