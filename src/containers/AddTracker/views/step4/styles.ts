import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const CongratulationTitle = styled.h2`
  font-size: 42px;
  font-weight: 300;
  margin: 15px auto;
`;
const Congratulation = styled.div`
  padding: 0 46.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CongratulationSubTitle = styled.span`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 31px;
`;
const CongratulationTracker = styled.span`
  margin-bottom: 15px;
  font-size: 14px;
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
  margin: 15px 0 9px;
`;
const CongratulationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 921px;
  background: #ffffff;
  padding: 33px 0 55px;
`;
const ImageDevice = styled.div`
  width: 50px;
  height: 50px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;
const useStyles = makeStyles(theme => ({
  widthBtn: {
    width: '400px',
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
export {
  Congratulation,
  CongratulationTracker,
  CongratulationSubTitle,
  CongratulationIcon,
  CongratulationTitle,
  CongratulationContent,
  ImageDevice,
  useStyles,
};
