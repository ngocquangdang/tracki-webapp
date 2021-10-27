import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Card = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  &::after {
    content: '';
    border-left: 1px solid #e0e0e0;
    width: 1px;
    height: 104px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  &:last-child::after {
    content: '';
    border: 0;
    width: 1px;
    height: 104px;
    position: absolute;
    top: 10px;
    right: 0;
  }
`;
const TitleCard = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const Content = styled.div``;
const DataView = styled.div`
  font-size: 42px;
  font-weight: 500;
  margin-top: 20px;
`;
const SubCard = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 7px 0;
`;
const SummaryDate = styled.div`
  font-size: 14px;
  font-weight: normal;
`;
const DetailSummary = styled.div`
  display: flex;
  padding: 15px 15px 36px;
`;

const SelectGroup = styled.div`
  width: 60%;
`;

const Description = styled.div`
  font-size: 14px;
  color: #999999;
  display: flex;
  align-items: center;
`;

const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const useStyles = makeStyles(theme => ({
  unitSize: {
    fontSize: 21,
  },
}));

export {
  useStyles,
  Card,
  TitleCard,
  Content,
  DataView,
  SubCard,
  SummaryDate,
  SelectGroup,
  Description,
  HeaderCard,
  DetailSummary,
};
