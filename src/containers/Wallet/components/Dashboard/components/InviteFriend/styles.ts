import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  content: {},
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  betweenJustify: {
    justifyContent: 'space-between',
  },
  mr0: {
    margin: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: '#666666',
    marginBottom: 15,
  },
  code: {
    fontSize: 36,
    fontWeight: 500,
    color: '#1a1a1a',
  },
  description: {
    maxWidth: 358,
    wordBreak: 'break-word',
  },
  codeField: {
    marginBottom: 25,
  },
}));

export { useStyles };
