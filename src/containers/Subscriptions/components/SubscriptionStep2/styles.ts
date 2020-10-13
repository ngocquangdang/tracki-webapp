import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div``;
const ControlChangePlan = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;
const TextChange = styled.span`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #999999;
`;
const InfoSubcription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36px;
  margin-top: 36px;
`;
const Country = styled.div`
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.38;
  letter-spacing: normal;
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 19px;
`;
const DetailIncrease = styled.div`
  width: 300px;
  height: 44px;
  border-radius: 4px;
  background-color: #168449;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 320px) {
    width: 270px;
  }
`;
const TypeMessage = styled.span`
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
`;
const Price = styled.span`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  padding-left: 8px;
`;
const SelectPayment = styled.div`
  padding: 0 59px 59px 59px;
  @media (max-width: 959.95px) {
    padding: 0px;
  }
`;

const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#999999',
    fontSize: '18px',
  },
  hidden: {
    display: 'none',
  },
}));

export {
  Container,
  ControlChangePlan,
  TextChange,
  InfoSubcription,
  Country,
  DetailIncrease,
  TypeMessage,
  Date,
  Price,
  SelectPayment,
  useStyles,
};
