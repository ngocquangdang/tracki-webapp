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
  trackerUrl?: string;
  button?: JSX.Element;
  isBackable?: boolean;
  handleClose(): void;
  children: any;
  isMobile: boolean;
  show: boolean;
  hasHeader?: boolean;
  direction?: 'left' | 'right' | 'down' | 'up';
  isLogo?: boolean;
}

export default function SideBarOut(props: Props) {
  const classes = useStyles();
  const {
    title,
    button,
    handleClose,
    children,
    isMobile,
    trackerUrl,
    isBackable,
    show,
    direction,
    isLogo,
    hasHeader = true,
  } = props;

  function capitalizeFirstLetter(string: string) {
    return string.replace(/\w\S*/g, function (txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Slide in={show} direction={direction || 'left'} mountOnEnter unmountOnExit>
      <MenuWrap isMobile={isMobile}>
        <WrapDisabled isMobile={isMobile}>
          {hasHeader && (
            <MenuHeader isMobile={isMobile}>
              {isMobile || isBackable ? (
                <WrapTitle>
                  <ArrowBackIosIcon
                    className={classes.iconBack}
                    onClick={handleClose}
                  />
                  {trackerUrl && (
                    <div className={classes.trackerWrap}>
                      <Logo
                        src={trackerUrl}
                        className={classes.trackerImg}
                        alt=""
                      />
                    </div>
                  )}
                  <TitleMobile>
                    {capitalizeFirstLetter(title)} {button}
                  </TitleMobile>
                </WrapTitle>
              ) : (
                <Title>
                  {capitalizeFirstLetter(title)} {button}
                </Title>
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
          )}
          {children}
        </WrapDisabled>
      </MenuWrap>
    </Slide>
  );
}
