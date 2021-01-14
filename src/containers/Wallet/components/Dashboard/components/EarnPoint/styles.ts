import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  btnBackground: {
    height: 36,
    marginBottom: 7,
    color: '#6a3c02',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    backgroundImage: 'linear-gradient(98deg, #ffda8f, #ffba31 100%)',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 7,
  },
  coin: {
    margin: '0 5px',
    fontSize: 16,
    fontWeight: 500,
    color: '#e99313',
  },
  cointLine: {
    margin: 0,
    color: '#e99313',
  },
}));

export { useStyles };
