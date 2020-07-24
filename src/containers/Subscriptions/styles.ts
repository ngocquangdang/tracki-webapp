import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
const Container = styled.div`
  background-color: #f4f5f6;
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Header = styled.header`
  display: flex;
  width: 100%;
  padding: 8px 10px;
  justify-content: space-between;
`;
const Logo = styled.img`
  object-fit: contain;
  height: 36px;
  margin: auto 0;
  @media (max-width: 959.95px) {
    height: 29px;
  }
`;
const WrapTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.span`
  font-size: 42px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
`;
const SubTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const TextSub = styled.span``;
const TextNormal = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
`;
const TextBold = styled.span`
  font-size: ${(props: { isTitle: boolean }) =>
    props.isTitle ? '16px' : '24px'};
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  margin-bottom: ${(props: { isTitle: boolean }) =>
    props.isTitle ? '' : '20px'};
  margin-top: ${(props: { isTitle: boolean }) =>
    props.isTitle ? '' : '120px'};
`;
const MainContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 921px;
  height: 375px;
  background-color: beige;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: 1px solid #e0e0e0;
  margin-top: 11px;
  padding: 0 260px;
`;
const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#4b4f56',
    '& span svg': {
      fontSize: '36px !important',
    },
  },
  infoIcon: {
    fontSize: '20px',
    color: theme.palette.primary.main,
  },
  logo: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '90.5px',
      height: '26px',
    },
  },
  logo2: {
    display: 'block',
    [theme.breakpoints.down(420)]: {
      width: '90.5px',
      height: '26px',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    color: '#1a1a1a',
  },
  select: {
    color: '#1a1a1a',
  },
  menuItem: {
    color: '#1a1a1a',
  },
}));

const SelectForm = withStyles(theme => ({
  root: {
    '&.MuiFormControl-root': {
      width: '100% !important',
      margin: '18px 0',
    },
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1a1a1a',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #1a1a1a',
      },
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 17px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.7)',
      },
    },
    '& > .MuiFormHelperText-root.Mui-error': {
      position: 'absolute',
      top: '50px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 14px',
    },
  },
}))(FormControl);

export {
  Container,
  Header,
  Content,
  Logo,
  WrapTitle,
  Title,
  SubTitle,
  TextSub,
  TextNormal,
  TextBold,
  MainContent,
  SelectForm,
  useStyles,
};
