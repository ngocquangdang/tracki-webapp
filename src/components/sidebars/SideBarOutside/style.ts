import styled from 'styled-components';
import { makeStyles, Theme } from '@material-ui/core/styles';

type PROPS = {
  isMobile: boolean;
};

const MenuWrap = styled.div`
  width: ${(p: PROPS) => (p.isMobile ? '100%' : '450px')};
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 403;
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
  z-index: ${(props: PROPS) => (props.isMobile ? '1000' : '10')};
  width: ${(props: PROPS) => (props.isMobile ? '100%' : '450px')};
  background-color: rgba(255, 255, 255, 0.5);
  color: #1a1a1a;
  border-bottom: ${(props: PROPS) =>
    props.isMobile ? ' 1px solid #e0e0e0' : 'none'};
  backdrop-filter: blur(30px);
`;

const ButtonClose = styled.div``;

const WrapDisabled = styled.div`
  width: ${(props: PROPS) => (props.isMobile ? '100%' : '450px')};
  max-height: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
`;

const WrapTitle = styled.div`
  align-items: center;
  display: flex;
  padding-left: 18px;
  cursor: pointer;
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
  padding-left: 18px;
  display: flex;
  align-items: center;
  @media (max-width: 959.95px) {
    padding-left: 4px;
  }
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

const Logo = styled.img`
  object-fit: contain;
  margin: auto 0;
  height: 29px;
`;

const TextAddNew = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
`;

const ButtonAdd = styled.div`
  display: flex;
  align-items: center;
  color: #666666;
  padding-right: 15px;
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
  logo: {
    display: 'block',
    width: '90.5px',
    height: '26px',
    marginRight: '15px',
  },
  trackerWrap: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: '10px 8px',
  },
  trackerImg: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  iconAdd: {
    margin: 5,
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
  Logo,
  TextAddNew,
  ButtonAdd,
  useStyles,
};
