import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

const Container = styled.div`
  background: #fafafa;
`;
const Logo = styled.img`
  object-fit: contain;
  height: 36px;
  margin: auto 0;
  @media (max-width: 959.95px) {
    height: 29px;
  }
`;
const Header = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  padding: 8px 10px;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  padding-top: 72px;
`;
const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px var(--e-0-e-0-e-0-border-color);
  background-color: #ffffff;
`;
const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#4b4f56',
    '& span svg': {
      fontSize: '36px !important',
    },
  },

  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  border: {
    borderRadius: 0,
  },
}));
const TabStyle = withStyles(theme => ({
  wrapper: {
    flexDirection: 'row',
    '& > *:first-child': {
      marginBottom: '0 !important',
      marginRight: '6px',
    },
  },
}))(Tab);
export { Container, Logo, Header, Wrapper, Content, TabStyle, useStyles };
