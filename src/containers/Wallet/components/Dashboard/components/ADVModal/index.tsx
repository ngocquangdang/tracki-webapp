import React from 'react';
import { Fade, Modal } from '@material-ui/core';
import clsx from 'clsx';

// styles
import { useStyles, BackDrop } from './styles';

// interface
interface Props {
  open: boolean;
  onClose: () => void;
  className?: string;
}

export default function AdvModal(props) {
  const classes = useStyles();

  const { open, onClose, className, ...rest } = props;
  return (
    <Modal
      open={open}
      onClose={onClose}
      disableBackdropClick={true}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={clsx(classes.modal, className)}
      closeAfterTransition
      BackdropComponent={BackDrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...rest}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div>advertisement</div>
        </div>
      </Fade>
    </Modal>
  );
}
