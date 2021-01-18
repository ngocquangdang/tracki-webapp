import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  coin: {
    margin: '0 5px',
    fontSize: 46,
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  cointLine: {
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  btnBackground: {
    height: 40,
    width: '100%',
    color: '#6a3c02',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    backgroundImage: 'linear-gradient(98deg, #ffda8f, #ffba31 100%)',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    margin: '10px 0',
  },
  mr0: {
    margin: 0,
  },
  img: {
    width: 46,
    height: 46,
  },
}));
export { useStyles };
