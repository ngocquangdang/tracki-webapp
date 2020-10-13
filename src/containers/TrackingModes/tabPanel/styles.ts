import styled from 'styled-components';

const Container = styled.div``;
const Content = styled.div`
  padding-bottom: 25px;
  @media (max-width: 375px) {
    padding: 0;
    font-size: 15px;
  }
`;
const Title = styled.h2`
  font-size: 28px;
  text-align: center;
  margin: 5px 0;
`;

export { Container, Content, Title };
