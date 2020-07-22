import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 300;

const ImageWrapper = styled.div`
  width: 50px;
  border-radius: 25px;
  height: 50px;
  display: flex;
  background-color: #168449;
`;
const Image = styled.img`
  width: 34px;
  height: 34px;
  margin: auto;
  object-fit: contain;
  border-radius: 100px;
  border: solid 1px rgba(255, 255, 255, 0.75);
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    height: '56px',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '56px',
    paddingLeft: '8px',
    paddingRight: '0px',
  },
  textHeader: {
    display: 'flex',
    fontSize: '20px',
    alignItems: 'center',
  },
  menuButton: {
    objectFit: 'contain',
  },
  menuMobile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
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

export { useStyles, ImageWrapper, Image };
