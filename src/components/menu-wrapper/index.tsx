import React from 'react';
import {
  MenuWrap,
  MenuHeader,
  useStyles,
  ButtonClose,
  WrapDisabled,
  Title,
} from './style';
import { GrFormClose } from 'react-icons/gr';
import { Fade } from '@material-ui/core';

export default function MenuWrapper(props: any) {
  const classes = useStyles();
  const { title, handleClose, children } = props;

  function capitalizeFirstLetter(string: string) {
    return string.replace(/\w\S*/g, function (txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Fade in mountOnEnter unmountOnExit>
      <MenuWrap>
        <WrapDisabled>
          <MenuHeader>
            <Title>{capitalizeFirstLetter(title)}</Title>
            <ButtonClose onClick={handleClose}>
              <GrFormClose className={classes.buttonClose} />
            </ButtonClose>
          </MenuHeader>
          {children}
        </WrapDisabled>
      </MenuWrap>
    </Fade>
  );
}
