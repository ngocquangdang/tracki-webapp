import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  container: {
    position: 'fixed',
    height: '100% ',
    width: '100%',
    zIndex: 405,
    top: 0,
    display: 'flex',
  },
  blur: {
    width: '10%',
    height: '100%',
    opacity: 0.5,
    backdropFilter: 'blur(2px)',
    backgroundColor: '#000000',
  },
  content: {
    width: '90%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8,
    borderBottom: '1px solid #dedede',
  },
  headerLeft: {
    display: 'flex',
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 4,
    alignSelf: 'center',
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    padding: 0,
    fontSize: 36,
    color: '#1a1a1a',
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 400,
    color: '#1a1a1a',
  },
  list: {
    maxHeight: 'calc(100% - 56px)',
    overflowY: 'auto',
  },
  trackeItem: {
    position: 'relative',
    padding: '0 15px',
    borderBottom: '1px solid #ddd',
    '& > div:last-child': {
      backgroundColor: 'unset',
      paddingRight: 0,
    },
    '&:last-child': {
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
