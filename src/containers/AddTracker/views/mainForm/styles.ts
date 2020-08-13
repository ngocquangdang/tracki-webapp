import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

const Container = styled.div`
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 60px auto 15px;
  @media (max-width: 995.95px) {
    margin: 0;
  }
`;
const Title = styled.h2`
  font-size: 42px;
  font-weight: 300;
  margin: 0;
  @media (max-width: 995.95px) {
    display: none;
  }
`;
const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: 300;
  margin: 0;
  @media (max-width: 995.95px) {
    margin: 15px 0;
    font-weight: 500;
  }
`;
const Content = styled.div`
  max-width: 921px;
  border: solid 1px #e0e0e0;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: #ffffff;
  @media (max-width: 995.95px) {
    max-width: 375px;
    margin: auto;
    border: 0;
    box-shadow: none;
    border-radius: 0;
  }
`;
const Review = styled.div`
  color: #168449;
  margin-left: 14px;
  cursor: pointer;
`;
const CongratulationTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin: 15px auto;
`;
const Congratulation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CongratulationSubTitle = styled.span`
  font-size: 14px;
  text-align: center;
`;
const CongratulationTracker = styled.span`
  margin-bottom: 15px;
`;
const CongratulationIcon = styled.div`
  color: #aeaeae;
  width: 85px;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f1f1;
  border-radius: 100%;
  margin: 15px auto 9px;
`;
const useStyles = makeStyles(theme => ({
  widthBtn: {
    width: '100%',
  },
  color: {
    color: '#1a1a1a',
  },
  show: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  marginIcon: {
    marginRight: 3,
  },
  icon: {
    width: 32.5,
    height: 43,
  },
}));
const StepperStyle = withStyles(theme => ({
  root: {
    paddingRight: 59,
    color: 'black',
    borderRadius: 4,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 6,
      paddingRight: 15,
    },
  },
}))(Stepper);
const LableStyle = withStyles(theme => ({
  root: {
    '& .MuiStepLabel-label': {
      fontSize: '18px !important',
      color: '#1a1a1a',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px !important',
      },
    },
    '& .MuiStepLabel-active': {
      fontSize: '18px !important',
      color: '#1a1a1a',
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px !important',
      },
    },
  },
  iconContainer: {
    '& .MuiSvgIcon-root': {
      width: 26,
      height: 26,
    },
  },
}))(StepLabel);
const StepContentStyle = withStyles(theme => ({
  root: {
    paddingRight: 0,
    paddingLeft: 22,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 15.5,
    },
  },
}))(StepContent);

export {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  useStyles,
  LableStyle,
  StepContentStyle,
  StepperStyle,
  Review,
  Congratulation,
  CongratulationTitle,
  CongratulationSubTitle,
  CongratulationTracker,
  CongratulationIcon,
};
