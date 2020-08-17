import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    height: 55,
    justifyContent: 'space-between',
    color: '#1a1a1a',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '1px 0 0 0 rgba(0, 0, 0, 0.12)',
    padding: '12px 8px 11px 8px',
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: '19px',
    alignSelf: 'center',
  },
  headerLeft: {
    display: 'flex',
  },
  iconBack: {
    width: 20,
    height: 20,
    position: 'relative',
    left: 3,
  },
  iconBtn: {
    width: 32,
    height: 32,
    padding: 0,
    color: '#1a1a1a',
  },
}));

export { useStyles };
