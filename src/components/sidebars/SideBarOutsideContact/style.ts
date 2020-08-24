import styled from 'styled-components';
import { makeStyles, Theme } from '@material-ui/core/styles';

type PROPS = {
  isMobile: boolean;
  isBlackView?: boolean;
};

const MenuWrap = styled.div`
  width: ${(p: PROPS) => (p.isMobile ? '100%' : '450px')};
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 411;
  left: 0;
`;
const MenuHeader = styled.div`
  display: flex;
  height: ${(props: PROPS) => (props.isMobile ? '56px' : '70px')};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: ${(props: PROPS) => (props.isMobile ? '100%' : '450px')};
  background-color: #363640;
  color: ${(props: PROPS) => (props.isBlackView ? '#fff' : '')};
`;

const Title = styled.div`
  font-size: 16px;
`;

const ButtonClose = styled.div``;

const WrapDisabled = styled.div`
  width: ${(props: PROPS) => (props.isMobile ? '100%' : '450px')};
  max-height: 100%;
  height: 100%;
  background-color: ${(props: PROPS) =>
    props.isBlackView ? '#363640' : '#fff'};
  overflow-y: auto;
`;

const WrapTitle = styled.div`
  align-items: center;
  display: flex;
  padding-left: 15px;
  cursor: pointer;
  width: 85%;
`;

const WrapTitleBlackView = styled.div`
  align-items: center;
  display: flex;
  padding-left: 15px;
  cursor: pointer;
`;

const Clear = styled.div`
  font-size: 14px;
  padding-right: 10px;
`;

const useStyles = makeStyles((theme: Theme) => ({
  buttonClose: {
    width: '25px',
    height: '25px',
    color: '#ffffff',
    cursor: 'pointer',
    marginRight: 14.5,
  },
  buttonCloseBlackView: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    marginRight: 5,
  },
}));

export {
  MenuWrap,
  MenuHeader,
  useStyles,
  ButtonClose,
  WrapDisabled,
  WrapTitle,
  WrapTitleBlackView,
  Title,
  Clear,
};
