import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  inputContainer: {
    '& input': {
      fontSize: 15,
      lineHeight: '18px',
    },
  },
  locationName: {
    color: '#1a1a1a',
    fontSize: 16,
  },
  locationDetail: {
    color: '#999',
    fontSize: 14,
  },
}));

export default useStyles;
