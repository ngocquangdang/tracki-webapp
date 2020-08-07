import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  },
  header: {
    display: 'flex',
    height: 55,
    justifyContent: 'space-between',
    color: '#1a1a1a',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '1px 0 0 0 rgba(0, 0, 0, 0.12)',
    padding: '12px 10px 11px 15px',
  },
  headerText: {
    fontSize: 17,
  },
  headBtn: {
    height: 32,
    fontSize: 16,
    lineHeight: '20px',
  },
  backBtn: {
    color: '#1a1a1a',
    fontSize: 17,
  },
  iconBack: {
    width: '20px',
    height: '20px',
  },
}));

export { useStyles };
