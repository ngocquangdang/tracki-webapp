import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: calc(100vh - 101px);
`;

const MapView = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const ContentCardDetail = styled.div`
  opacity: 0.95;
  border-radius: 4px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin: 10px 6px;
  position: relative;
  top: calc(100% - 175px);
  @media (max-width: 320px) {
    top: calc(100% - 200px);
  }
`;
export { Container, MapView, ContentCardDetail };
