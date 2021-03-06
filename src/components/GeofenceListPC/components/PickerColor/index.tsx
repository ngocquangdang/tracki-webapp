import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import {
  Done as DoneIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';

import Modal from '@Components/modals';
import { useStyles } from './styles';

const COLORS = [
  ['#168449', '#f6402b', '#9c1ab0', '#6432b9', '#3d4eb8'],
  ['#019587', '#01bad6', '#01a6f6', '#1193f5', '#88c440'],
  ['#ccdd1d', '#ffec16', '#fec200', '#ff9900', '#000000'],
  ['#5d7d8a', '#9d9d9d', '#795547', '#ff5507', '#ff57ab'],
];

interface Props {
  selectedColor: string;
  onChangeColor(c: string): void;
}

function FenceColorModal(props: Props) {
  const { selectedColor, onChangeColor } = props;
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  const onSelectColor = (c: string) => () => onChangeColor(c);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <div className={classes.pickColor} onClick={openModal}>
        <div
          style={{ backgroundColor: selectedColor }}
          className={classes.color}
        />
        <ArrowDropDownIcon />
      </div>
      <Modal
        title="Fence Color"
        open={isOpen}
        handleClose={closeModal}
        className={classes.pickColorModal}
      >
        <div className={classes.container}>
          {COLORS.map((c: string[], rIndex: number) => (
            <div className={classes.colorRow} key={rIndex}>
              {c.map((i: string) => (
                <IconButton
                  key={i}
                  style={{ backgroundColor: i }}
                  onClick={onSelectColor(i)}
                  className={classes.colorBtn}
                >
                  {i === selectedColor && <DoneIcon />}
                </IconButton>
              ))}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default FenceColorModal;
