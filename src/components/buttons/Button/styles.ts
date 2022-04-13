import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  loading: {
    marginLeft: 6,
    width: 16,
    height: 16,
    color: 'white',
  },
});

const ButtonStyle = withStyles(theme => ({
  root: {
    fontSize: 16,
    height: 50,
  },
}))(Button) as any;

export { ButtonStyle, useStyles };
