import styled from 'styled-components';

const Header = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 38px;
  @media (max-width: 995.95px) {
    height: 56px;
    padding: 0 14px;
  }
`;
const Container = styled.div`
  height: calc(100% - 70px);
  background: #e5e6e9;
  position: relative;
`;
const Image = styled.img`
  height: 35.4px;
  object-fit: contain;
  @media (max-width: 995.95px) {
    height: 26px;
  }
`;

export { Header, Container, Image };
