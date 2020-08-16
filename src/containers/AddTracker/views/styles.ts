import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  stepChild: string;
}
const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background-color: #f4f5f6;
  @media (max-width: 995.95px) {
    background: ${props => (props.stepChild !== '' ? '#f4f5f6' : '#ffffff')};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 921px;
  width: 100%;
  margin: 0 auto 100px;
  height: 100%;
  /* overflow-y: overlay; */
  @media (max-width: 995.95px) {
    margin: 0 auto;
    padding-bottom: 100px;
  }
`;

const Logo = styled.img`
  object-fit: contain;
  height: 36px;
  margin: auto 0;
  @media (max-width: 995.95px) {
    height: 29px;
  }
`;

const Header = styled.header`
  position: relative;
  top: 0;
  display: flex;
  width: 100%;
  padding: 8px 50px;
  justify-content: space-between;
  @media (max-width: 995.95px) {
    padding: 5px;
    background-color: #ffffff;
    border-bottom: 1px solid #ccd0d5;
    height: 56px;
  }
`;

const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#1a1a1a',
    fontSize: 16,
    padding: 0,
    '& span svg': {
      fontSize: '36px !important',
    },
  },
}));

export { Container, Logo, Header, Content, useStyles };
