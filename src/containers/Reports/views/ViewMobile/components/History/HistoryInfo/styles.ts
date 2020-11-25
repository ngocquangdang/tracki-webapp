import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  flexRow: {
    display: 'flex',
  },
  flexRowCenter: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  paperInfo: {
    padding: '9px 14px 9px 15px',
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    backgroundColor: '#ffffff',
  },
  pr: {
    paddingRight: 10,
  },
  flexColEnd: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    lineHeight: 1.34,
  },
  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 1.34,
    width: '100%',
  },
  textFont11: {
    fontSize: 11,
    fontWeight: 300,
    whiteSpace: 'nowrap',
  },
  textFont16: {
    fontSize: 16,
  },
  pl: {
    paddingLeft: 10,
  },
  sectionInfo: {
    padding: '0 15px',
    marginBottom: 10,
  },
  ml: {
    marginLeft: 3,
  },
  mt: {
    marginTop: 3,
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
}));

export { useStyles };
