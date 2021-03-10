import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  box: {
    width: '80%',
    margin: '0 auto',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
    },
  },
  leftBox: {
    flex: 0.75,
    height: '100vh',
    marginRight: 20,
    borderRadius: 4,
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    border: '1px solid #e0e0e0',
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
      marginRight: 0,
    },
  },
  rightBox: {
    flex: 0.25,
    height: '100vh',
    borderRadius: 4,
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    border: '1px solid #e0e0e0',
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
  sectionBanner: {
    height: '50%',
    backgroundImage: 'linear-gradient(245deg, #08884c 100%, #4bbc7f)',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      backgroundImage: 'linear-gradient(217deg, #ffbf69, #ff578c)',
    },
  },
  contentBanner: {
    padding: 20,
    color: '#fff',
  },
  flexRow: {
    display: 'flex',
  },
  flexColCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  qrImg: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  referImg: {
    width: 300,
    height: 300,
    [theme.breakpoints.down('sm')]: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
  },
  text: {
    fontWeight: 300,
  },
  textSize32: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 26,
      marginBottom: 15,
    },
  },
  textSize16: {
    fontSize: 16,
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  },
  textGrey: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 1.2,
  },
  textBlue: {
    color: '#1976d2',
    fontSize: 14,
    lineHeight: 1.2,
    cursor: 'pointer',
    '& > svg': {
      marginRight: 5,
    },
  },
  textSize36: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  textSize15: {
    fontSize: 15,
    lineHeight: 1.2,
  },
  textSize20: {
    fontSize: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRed: {
    color: '#cc2c2c',
  },
  mb20: {
    marginBottom: 20,
  },
  mt20: {
    marginTop: 20,
  },
  bold: {
    fontWeight: 500,
  },
  btnMain: {
    marginBottom: 7,
    width: '70%',
    color: '#6a3c02',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    backgroundImage: 'linear-gradient(98deg, #ffda8f, #ffba31 100%)',
    [theme.breakpoints.down('sm')]: {
      marginTop: 15,
      width: '85%',
      color: '#fff',
      backgroundImage: 'none',
      backgroundColor: '#168449',
    },
  },
  mainBanner: {
    height: '80%',
    width: '80%',
    margin: '0 auto',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
  },
  boxReferalCode: {
    width: 345,
    height: 130,
    padding: 20,
    borderRadius: 4,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.25)',
    border: '1px solid #fefefe',
    backgroundColor: '#f4f5f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'absolute',
    bottom: -50,
    left: 100,
    color: '#1a1a1a',
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
  sectionInvite: {
    padding: 65,
    height: '50%',
    maxHeight: '50%',
  },
  headerList: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#666666',
    fontSize: 14,
    backgroundColor: '#f4f5f6',
    padding: '15px 10px',
    marginBottom: 15,
  },
  green: {
    color: '#168449',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 10px',
    color: '#1a1a1a',
  },
  iconCheck: {
    marginLeft: 10,
  },
  ml10: {
    marginLeft: 10,
  },
  imgDollar: {
    backgroundImage: 'linear-gradient(138deg, #fde300 15%, #ff9900 86%)',
    width: 42,
    height: 42,
    borderRadius: 100,
    '& > img': {
      width: 20,
      height: 20,
    },
  },
  listItem: {
    overflow: 'auto',
    height: '100%',
    maxHeight: '100%',
  },
  helpIcon: {
    fontSize: 15,
  },
}));

const Image = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;

export { useStyles, Image };
