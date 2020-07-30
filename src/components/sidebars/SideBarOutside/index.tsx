import React from 'react';
import {
  MenuWrap,
  MenuHeader,
  useStyles,
  ButtonClose,
  WrapDisabled,
  WrapTitle,
  TitleMobile,
  ButtonSave,
  TextSave,
  Title,
  Logo,
} from './style';
import { GrFormClose } from 'react-icons/gr';
import { Slide } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneIcon from '@material-ui/icons/Done';
import Link from 'next/link';

interface Props {
  title: string;
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
  const {
    title,
    handleClose,
    children,
    isMobile,
    isBackable,
    show,
    direction,
    isLogo,
  } = props;

  function capitalizeFirstLetter(string: string) {
    return string.replace(/\w\S*/g, function (txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Slide in={show} direction={direction || 'left'} mountOnEnter unmountOnExit>
      <MenuWrap>
        <WrapDisabled isMobile={isMobile}>
          <MenuHeader isMobile={isMobile}>
            {isMobile || isBackable ? (
              <WrapTitle>
                <ArrowBackIosIcon
                  className={classes.iconBack}
                  onClick={handleClose}
                />
                <TitleMobile>{capitalizeFirstLetter(title)}</TitleMobile>
              </WrapTitle>
            ) : (
              <Title>{capitalizeFirstLetter(title)}</Title>
            )}
            {isMobile ? (
              isLogo ? (
                <Link href="/">
                  <Logo
                    src="/images/logo.png"
                    className={classes.logo}
                    alt=""
                  />
                </Link>
              ) : (
                <ButtonSave>
                  <DoneIcon className={classes.iconSave} />
                  <TextSave>Save</TextSave>
                </ButtonSave>
              )
            ) : (
              <ButtonClose onClick={handleClose}>
                <GrFormClose className={classes.buttonClose} />
              </ButtonClose>
            )}
          </MenuHeader>
          {children}
        </WrapDisabled>
      </MenuWrap>
    </Slide>
  );
}
