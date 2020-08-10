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
  position: absolute;
  bottom: 5px;
  width: calc(100% - 10px);
  left: 5px;
  right: 5px;
  z-index: 400;
`;
export { Container, MapView, ContentCardDetail };
