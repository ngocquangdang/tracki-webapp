import styled from 'styled-components';

const AlertCard = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: 0;
  }
`;

const TitleAlert = styled.div`
  padding: 5px 0;
  font-size: 14px;
  font-weight: 500;
`;

const AddressAlert = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const DateAlert = styled.div`
  font-size: 14px;
`;

export { AlertCard, TitleAlert, AddressAlert, DateAlert };
