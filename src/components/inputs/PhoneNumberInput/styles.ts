import styled from 'styled-components';

const PhoneNumber = styled.div`
  display: flex;
  & > :nth-child(1) {
    flex: 2;
    margin: auto;
    margin-right: 10px;
  }
  & > :nth-child(2) {
    flex: 3;
  }
`;

export { PhoneNumber };
