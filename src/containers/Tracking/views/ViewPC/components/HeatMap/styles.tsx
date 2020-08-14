import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
  },
  tracker: {
    paddingTop: 14,
    boxShadow: 'inset 0px 3px 3px 0px rgba(210, 210, 210, 0.3)',
  },
  text: {
    padding: '10px 15px',
    fontSize: 16,
    lineHeight: '19px',
    color: '#1a1a1a',
    margin: 0,
  },
  list: {
    maxHeight: 'calc(100% - 370px)',
    overflowY: 'auto',
  },
  trackeItem: {
    position: 'relative',
    padding: '0 15px',
    '& > div:last-child': {
      backgroundColor: 'unset',
      paddingRight: 0,
      borderBottom: '1px solid #ddd',
    },
    '&:last-child > div:last-child': {
      borderBottom: 'none',
    },

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      '& div:last-child': {
        backgroundColor: 'unset',
      },
    },
  },
  selectedTracker: {
    position: 'absolute',
    top: 8,
    left: 0,
    width: 3,
    height: 50,
    backgroundColor: theme.palette.primary.main,
  },
  formSelect: {
    padding: '0 15px',
    marginBottom: '15px',
  },
}));

export { useStyles };
