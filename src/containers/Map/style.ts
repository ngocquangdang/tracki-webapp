import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const MapBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
`;
const NavigationControl = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 27px;
  margin-right: 10.2px;
  width: 39.8px;
  height: 100%;
`;

export { MapBox, MapContainer, NavigationControl };
