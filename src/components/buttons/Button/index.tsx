import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

import { ButtonStyle, useStyles } from './styles';

type Props = {
  text: string;
  classes?: string;
  onClick?(): void;
  isLoading?: boolean;
  disabled?: boolean;
  [data: string]: any;
};

const ButtonComp = React.forwardRef((props: Props, ref) => {
  const styles = useStyles();
  const { text, classes, onClick, isLoading, disabled, ...rest } = props;

  return (
    <ButtonStyle
      className={classes || ''}
      onClick={onClick}
      disabled={isLoading || disabled}
      {...rest}
    >
      {text}
      {isLoading && <CircularProgress size="sm" className={styles.loading} />}
    </ButtonStyle>
  );
});

export default ButtonComp;
