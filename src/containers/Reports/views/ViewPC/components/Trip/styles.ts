import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '27px 20px',
    height: 'calc(100% - 55px)',
    overflowY: 'auto',
  },
  rowLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  rowRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.6,
    flex: 1,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: 500,
  },
  mr: {
    marginRight: 15,
  },
  ml: {
    marginLeft: 15,
  },
  mb: {
    marginBottom: 15,
  },
  mt: {
    marginTop: 15,
  },
  textFont17: {
    fontSize: 17,
  },
  textFont16: {
    fontSize: 16,
  },
  textFont14: {
    fontSize: 14,
  },
  textFont11: {
    fontSize: 11,
  },
  colorGrey: {
    color: '#999999',
  },
  textColorMain: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  imageWrapper: {
    width: 50,
    borderRadius: 25,
    height: 50,
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    marginRight: 16,
  },
  textNoWrap: {
    whiteSpace: 'nowrap',
    paddingTop: 3,
  },
  textWeight300: {
    fontWeight: 300,
  },
  datePicker: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
}));

const Image = styled.div`
  width: 43px;
  height: 37px;
  border-radius: 100px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;

export { useStyles, Image };
