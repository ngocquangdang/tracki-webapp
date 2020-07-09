import React from 'react';
import {
  MenuWrap,
  Wrap,
  useStyles,
  ButtonClose,
  WrapDisabled,
  Title,
} from './style';
import { GrFormClose } from 'react-icons/gr';
import { Fade } from '@material-ui/core';

export default function MenuWrapper(props: any) {
  const classes = useStyles();
  const { isDisabled, checked, title, handleClose } = props;

  function capitalizeFirstLetter(string: string) {
    return string.replace(/\w\S*/g, function (txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div>
      {isDisabled ? (
        <Fade in={checked} mountOnEnter unmountOnExit>
          <MenuWrap>
            <WrapDisabled>
              <Title>{capitalizeFirstLetter(title)}</Title>
              <ButtonClose onClick={handleClose}>
                <GrFormClose className={classes.buttonClose} />
              </ButtonClose>
              {props.children}
            </WrapDisabled>
          </MenuWrap>
        </Fade>
      ) : (
        <Fade in={checked} mountOnEnter unmountOnExit>
          <Wrap>
            <Title>{capitalizeFirstLetter(title)}</Title>
            <ButtonClose onClick={handleClose}>
              <GrFormClose className={classes.buttonClose} />
            </ButtonClose>
            {props.children}
          </Wrap>
        </Fade>
      )}
    </div>
  );
}
