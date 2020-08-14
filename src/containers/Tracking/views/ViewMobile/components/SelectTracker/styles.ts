import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
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
}));
