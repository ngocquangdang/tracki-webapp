import React from 'react';
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';
import { Slide } from '@material-ui/core';

import {
  MenuWrap,
  MenuHeader,
  useStyles,
  ButtonClose,
  WrapDisabled,
  WrapTitle,
  Title,
  WrapTitleBlackView,
  Clear,
} from './style';

interface Props {
  button?: JSX.Element;
  isBackable?: boolean;
  handleClose(): void;
  children: any;
  isMobile: boolean;
  show: boolean;
  direction?: 'left' | 'right' | 'down' | 'up';
  isLogo?: boolean;
  isBlackView?: boolean;
  title?: string;
}

export default function SideBarOut(props: Props) {
  const classes = useStyles();
  const {
    button,
    handleClose,
    children,
    isMobile,
    show,
    direction,
    isBlackView,
    title,
  } = props;
  return (
    <Slide in={show} direction={direction || 'left'} mountOnEnter unmountOnExit>
      <MenuWrap isMobile={isMobile}>
        <WrapDisabled isMobile={isMobile} isBlackView={isBlackView}>
          {isBlackView ? (
            <MenuHeader isMobile={isMobile} isBlackView={isBlackView}>
              <WrapTitleBlackView>
                <Link href="/">
                  <div>
                    <IoMdClose
                      className={classes.buttonCloseBlackView}
                      onClick={handleClose}
                    />
                  </div>
                </Link>
                <Title>{title}</Title>
              </WrapTitleBlackView>
              <Clear onClick={handleClose}>Clear all</Clear>
            </MenuHeader>
          ) : (
            <MenuHeader isMobile={isMobile}>
              <WrapTitle>{button}</WrapTitle>
              <ButtonClose onClick={handleClose}>
                <IoMdClose className={classes.buttonClose} />
              </ButtonClose>
            </MenuHeader>
          )}
          {children}
        </WrapDisabled>
      </MenuWrap>
    </Slide>
  );
}
