import styled from 'styled-components';
import { makeStyles, Theme } from '@material-ui/core/styles';

const MenuWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  right: 0;
`;
const MenuHeader = styled.div`
  display: flex;
  height: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '56px' : '70px'};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '100%' : '450px'};
  background-color: #fff;
  border-bottom: ${(props: { isMobile: boolean }) =>
    props.isMobile ? ' 1px solid #e0e0e0' : 'none'};
`;

const ButtonClose = styled.div``;

const WrapDisabled = styled.div`
  width: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '100%' : '450px'};
  max-height: 100%;
  background-color: #fff;
  overflow-y: auto;
`;

const WrapTitle = styled.div`
  align-items: center;
  display: flex;
  padding-left: 18px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
`;
const ButtonSave = styled.div`
  color: #168449;
  display: flex;
  align-items: center;
  padding-right: 15px;
`;

const TitleMobile = styled(Title)`
  font-weight: normal;
`;
const TextSave = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
`;

const useStyles = makeStyles((theme: Theme) => ({
  buttonClose: {
    width: '46.8px',
    height: '46.8px',
    color: '#1a1a1a',
    cursor: 'pointer',
  },
  iconBack: {
    fontSize: '20px',
  },
  iconSave: {
    fontSize: '20px',
    color: '#168449',
    marginRight: '8px',
  },
}));

export {
  MenuWrap,
  MenuHeader,
  ButtonClose,
  Title,
  WrapTitle,
  WrapDisabled,
  TitleMobile,
  ButtonSave,
  TextSave,
  useStyles,
};
