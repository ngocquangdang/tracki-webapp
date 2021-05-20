import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';

import Modal from '@Components/modals';
import { Button } from '@Components/buttons';

import { useStyles } from './styles';

interface IProps {
  open: boolean;
  closeModal: () => void;
  t: any;
  value: number;
  saveValue: (value: number) => () => void;
}

function EditCashModal(props: IProps) {
  const classes = useStyles();

  const { open, closeModal, t, value, saveValue } = props;
  const [valueInput, seValueInput] = useState(value);

  const onChangeInput = (item: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = item.target;
    seValueInput(+value);
  };

  const onClickSaveValue = () => {
    saveValue(valueInput)();
    closeModal();
  };

  return (
    <Modal
      title={t('wallet:edit_cash_value')}
      open={open}
      handleClose={closeModal}
    >
      <div className={classes.container}>
        <TextField
          style={{ color: `'#1a1a1a·!important'` }}
          className={classes.inputNumber}
          label="Number"
          type="number"
          value={valueInput}
          onChange={onChangeInput}
        />
      </div>
      <Button
        text={t('wallet:save_cash_value')}
        color="primary"
        fullWidth
        variant="contained"
        onClick={onClickSaveValue}
      />
    </Modal>
  );
}

export default EditCashModal;
