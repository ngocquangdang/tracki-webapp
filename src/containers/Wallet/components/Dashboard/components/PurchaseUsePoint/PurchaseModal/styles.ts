import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {},
  card: {
    height: 234,
    borderRadius: 4,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.25)',
    border: '1px solid #fefefe',
  },
  btnBackground: {
    height: 40,
    width: '100%',
    color: '#6a3c02',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    backgroundImage: 'linear-gradient(98deg, #ffda8f, #ffba31 100%)',
  },
  itemName: {},
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  coin: {
    margin: '0 5px',
    fontSize: 16,
    fontWeight: 500,
    color: '#e99313',
  },
  cointLine: {
    marginBottom: 20,
    color: '#e99313',
  },
}));

export { useStyles };
