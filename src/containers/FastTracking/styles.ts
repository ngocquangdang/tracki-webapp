import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    // maxWidth: 375,
  },
  header: {
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 300,
  },
  fastTracContact: {
    fontSize: '12px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 3.5,
    letterSpacing: 'normal',
    color: '#999999',
    textAlign: 'center',
    margin: 0,
  },
}));
export { useStyles };
