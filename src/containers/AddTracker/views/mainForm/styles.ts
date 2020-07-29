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
`;
const Title = styled.h2`
  font-size: 42px;
  margin: 0;
`;
const SubTitle = styled.h3`
  font-size: 18px;
`;
const Content = styled.div`
  max-width: 921px;
  border-radius: 4px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px var(--e-0-e-0-e-0-border-color);
  background-color: #ffffff;
`;
const Review = styled.div`
  color: #168449;
  margin-left: 14px;
  cursor: pointer;
`;

const useStyles = makeStyles(theme => ({
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
}));
const StepperStyle = withStyles(theme => ({
  root: {
    paddingRight: 59,
  },
}))(Stepper);
const LableStyle = withStyles(theme => ({
  root: {
    '& .MuiStepLabel-label': {
      color: '#1a1a1a',
      display: 'flex',
    },
    '& .MuiStepLabel-active': {
      color: '#1a1a1a',
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
};
