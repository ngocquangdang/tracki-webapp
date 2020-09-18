import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '48%',
    maxWidth: 735,
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px #fefefe',
    backgroundColor: '#ffffff',
    marginLeft: 20,
    marginBottom: 12,
    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
  content: {
    padding: '20px 20px 20px 15px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTag: {
    fontSize: 50,
    color: theme.palette.primary.main,
  },
  icon: {
    display: 'flex',
    paddingRight: 20,
  },
  descriptionDiscount: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  codeDiscount: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.8,
  },
  textDiscount: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.21,
  },
  expiriDate: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.17,
    color: theme.palette.primary.main,
  },
  contentDescription: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export { useStyles };
