import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { Header, Title, BackDrop, useStyles } from './styles';

interface Props {
  open: boolean;
  handleClose?(): void;
  children: any;
  title: string;
}
export default function TransitionsModal(props: Props) {
  const { open, handleClose, title, ...rest } = props;
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={BackDrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...rest}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Header>
            <Title>{title}</Title>
            <IconButton style={{ padding: 0 }} onClick={handleClose}>
              <Close />
            </IconButton>
          </Header>
          {props.children}
        </div>
      </Fade>
    </Modal>
  );
}
