import styled from 'styled-components';

const PhoneNumber = styled.div`
  display: flex;
  & > :nth-child(1) {
    flex: 2;
    margin: auto;
    margin-right: 10px;
    @media (max-width: 959.95px) {
      flex: 1;
    }
  }
  & > :nth-child(2) {
    flex: 3;
    @media (max-width: 959.95px) {
      flex: 5;
    }
  }
`;

export { PhoneNumber };
