import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    width: 'calc((100% - 35px)/3)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      boxShadow: 'none',
      border: '0',
      borderRadius: 0,
      borderBottom: '1px solid #e0e0e0',
      marginBottom: 20,
    },
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    background: '#f4f5f6',
    [theme.breakpoints.down('sm')]: {
      background: '#f4f5f6',
    },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: '#1a1a1a',
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.secondary.main,
      fontSize: 14,
    },
  },
  cardView: {
    fontSize: 16,
    color: '#1976d2',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  cardContent: {
    padding: 20,
  },
  cardFooter: {
    padding: '20px 0',
    display: 'flex',
    background: '#F4F5F6',
    [theme.breakpoints.down('sm')]: {
      background: '#ffffff',
    },
  },
  mr0: {
    margin: 0,
  },
  isMobile: {
    width: '100%',
    boxShadow: 'none',
    border: '0',
    borderRadius: 0,
    borderBottom: '1px solid #e0e0e0',
    marginBottom: 20,
  },
}));

export { useStyles };
