import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    padding: '0 16px 200px 16px',
  },
  containerMobile: {
    padding: 16,
  },
  content: {
    textAlign: 'center',
    margin: 'auto',
  },
  text: {
    fontSize: 24,
    lineHeight: '30px',
    marginBottom: 22,
    padding: '0 40px',
  },
  space: { margin: 8 },
}));

export { useStyles };
