import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    width: '100%',
    padding: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    margin: 0,
    textTransform: 'capitalize',
  },
  viewMore: {
    fontSize: 16,
    color: '#1976d2',
    cursor: 'pointer',
    margin: 0,
  },
  item: {
    borderRadius: 4,
    border: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 8,
    width: 95,
    height: 78,
    fill: '#666666',
    color: '#666666',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  itemList: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  isActive: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    ' & > svg': {
      fill: theme.palette.primary.main,
    },
  },
  itemTitle: {
    fontSize: 14,
    margin: 5,
  },
  cardItem: {
    width: 'calc((100% - 100px)/6)',
  },
  cardList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
    justifyContent: 'center',
  },
  btnBackground: {
    height: 40,
    width: '100%',
    color: '#6a3c02',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    backgroundImage: 'linear-gradient(98deg, #ffda8f, #ffba31 100%)',
  },
  titleCard: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    height: 50,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  cardSubscription: {
    display: 'flex',
    alignItems: 'center',
  },
  mr20: {
    marginRight: 20,
  },
  bgCard: {
    backgroundImage: 'linear-gradient(129deg, #28a763 1%, #0d7d41 100%)',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  planName: {
    padding: '3px 18px',
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    textTransform: 'capitalize',
  },
  caption: {
    fontWeight: 500,
    margin: '5px 0',
  },
  mr0: {
    margin: 0,
  },
  subTitle: {
    fontWeight: 300,
    textTransform: 'lowercase',
  },
  smsTitle: {
    fontSize: 37,
    fontWeight: 'bold',
  },
  smsPlan: {
    fontSize: 15,
  },
  smsPrice: {
    fontSize: 19,
    margin: 10,
  },
}));

export { useStyles };
