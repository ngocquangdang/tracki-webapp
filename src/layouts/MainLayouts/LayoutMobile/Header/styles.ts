import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 300;

const ImageWrapper = styled.div`
  width: 50px;
  border-radius: 25px;
  height: 50px;
  margin-right: 10px;
  display: flex;
  background-color: #168449;
`;

const Image = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
  border: solid 1px rgba(255, 255, 255, 0.75);
`;
const DefaultImage = styled.img`
  width: 34px;
  height: 34px;
  margin: auto;
  padding: 2px;
  object-fit: contain;
  border-radius: 100px;
  border: solid 1px rgba(255, 255, 255, 0.75);
`;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: 'rgba(17, 116, 63, 0.95)',
    color: '#fff',
    height: '56px',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '56px',
    paddingLeft: '2px',
    paddingRight: '14px',
  },
  textHeader: {
    display: 'flex',
    fontSize: '20px',
    alignItems: 'center',
    fontWeight: 400,
    marginLeft: '2px',
  },
  menuButton: {
    objectFit: 'contain',
    marginLeft: 0,
    padding: '8px',
  },
  menuMobile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  menuIcon: {
    fontSize: '40px',
  },
  appBar: {
    zIndex: 8,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    zIndex: 8,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fontSize: {
    fontSize: '16px',
  },
}));

export { useStyles, ImageWrapper, Image, DefaultImage };
