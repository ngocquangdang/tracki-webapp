import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  height: calc(100vh - 70px);
  width: 100%;
`;

const MapView = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const ContainerAlert = styled.div`
  position: absolute;
  right: 0;
  height: 50px;
  z-index: 405;
  margin: 16px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  background-color: #fff;
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  border-radius: 5px;
`;
const ContentAlert = styled.div`
  padding-right: 15px;
  display: flex;
`;
const ButtonClear = styled.div`
  color: #168449;
  cursor: pointer;
`;

const IconSos = styled.img`
  border-radius: 50%;
  background-color: #f1f1f1;
  margin-right: 15px;
  width: 31px;
  height: 30px;
`;
const Content = styled.div`
  padding-left: 10px;
`;
export {
  Container,
  MapView,
  ContainerAlert,
  ContentAlert,
  ButtonClear,
  IconSos,
  Content,
};
