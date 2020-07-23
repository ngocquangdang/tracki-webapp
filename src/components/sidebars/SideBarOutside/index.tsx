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
} from './style';
import { GrFormClose } from 'react-icons/gr';
import { Fade } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneIcon from '@material-ui/icons/Done';

interface Props {
  title: string;
  handleClose(): void;
  children: JSX.Element;
  isMobile: boolean;
}

export default function SideBarOut(props: Props) {
  const classes = useStyles();
  const { title, handleClose, children, isMobile } = props;

  function capitalizeFirstLetter(string: string) {
    return string.replace(/\w\S*/g, function (txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Fade in mountOnEnter unmountOnExit>
      <MenuWrap>
        <WrapDisabled isMobile={isMobile}>
          <MenuHeader isMobile={isMobile}>
            {isMobile ? (
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
              <ButtonSave>
                <DoneIcon className={classes.iconSave} />
                <TextSave>Save</TextSave>
              </ButtonSave>
            ) : (
              <ButtonClose onClick={handleClose}>
                <GrFormClose className={classes.buttonClose} />
              </ButtonClose>
            )}
          </MenuHeader>
          {children}
        </WrapDisabled>
      </MenuWrap>
    </Fade>
  );
}
