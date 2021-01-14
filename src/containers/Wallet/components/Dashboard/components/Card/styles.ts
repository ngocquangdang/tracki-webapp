import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  cardContainer: {
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    width: 'calc((100% - 20px)/3)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    background: '#f4f5f6',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: '#1a1a1a',
  },
  cardView: {
    fontSize: 16,
    color: '#1976d2',
    cursor: 'pointer',
  },
  cardContent: {
    padding: 20,
  },
  cardFooter: {
    padding: '20px 0',
    display: 'flex',
    background: '#F4F5F6',
  },
  mr0: {
    margin: 0,
  },
}));

export { useStyles };
