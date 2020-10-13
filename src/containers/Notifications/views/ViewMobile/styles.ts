import styled from 'styled-components';

const OptionView = styled.div`
  padding-right: ${(props: { isDateRange: boolean }) =>
    props.isDateRange ? '0' : '15px'};
  width: 100%;
`;
const DetailCard = styled.div`
  padding: 15px;
`;
const ListOptionView = styled.div`
  margin-top: 70px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 15px;
  flex-direction: ${(props: { isDateRange: boolean }) =>
    props.isDateRange ? 'column' : 'row'};
`;
const FilterData = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
const DatePicker = styled.div`
  width: 100%;
  margin-top: ${(props: { isDateRange: boolean }) =>
    props.isDateRange ? '15px' : '0'};
`;
export { OptionView, ListOptionView, DetailCard, FilterData, DatePicker };
