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
  // TextSave,
  Title,
  Logo,
  TextAddNew,
  ButtonAdd,
} from './style';
import { GrFormClose } from 'react-icons/gr';
import { Slide } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneIcon from '@material-ui/icons/Done';
import Link from 'next/link';
import { IoMdPersonAdd } from 'react-icons/io';

interface Props {
  title: any;
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
  isAddContact?: boolean;
  isNotSave?: boolean;
  onShowAddContact?(): void;
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
    isAddContact,
    onShowAddContact,
    hasHeader = true,
    isNotSave,
  } = props;

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
                    {title}
                    {button}
                  </TitleMobile>
                </WrapTitle>
              ) : (
                <Title>
                  {title}
                  {button}
                </Title>
              )}
              {isMobile ? (
                isLogo ? (
                  isAddContact ? (
                    <ButtonAdd onClick={onShowAddContact}>
                      <IoMdPersonAdd className={classes.iconAdd} />
                      <TextAddNew>Add New</TextAddNew>
                    </ButtonAdd>
                  ) : (
                    <Link href="/">
                      <Logo
                        src="/images/logo.png"
                        className={classes.logo}
                        alt=""
                      />
                    </Link>
                  )
                ) : (
                  !isNotSave && (
                    <ButtonSave>
                      <DoneIcon className={classes.iconSave} />
                      {/* <TextSave>Save</TextSave> */}
                    </ButtonSave>
                  )
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
