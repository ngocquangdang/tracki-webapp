import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  mapView: {
    position: 'relative',
    height: 'calc(100% - 101px)',
    width: '100%',
  },
  trackerCard: {
    opacity: 0.95,
    borderRadius: 4,
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 5,
    width: 'calc(100% - 10px)',
    left: 5,
    right: 5,
    zIndex: 400,
  },
}));

export { useStyles };
