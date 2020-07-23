import styled from 'styled-components';

const LayerPanel = styled.div`
  display: none;
  background: blue;
  width: 195px;
  height: auto;
  padding: 8px 11px;
  top: 20%;
  right: 45px;
  color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(22, 132, 73, 0.9);
  position: absolute;
`;
const Title = styled.span`
  font-size: 11px;
`;
const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 5px;
`;
const LayerItem = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;
const Item = styled.li`
  list-style: none;
  display: block;
`;
const Image = styled.img`
  display: block;
  border-radius: 10px;
  border: 2px solid transparent;
  border-color: ${(p: { active: boolean }) =>
    p.active ? '#fff' : 'transparent'};
`;
const Name = styled.span`
  font-size: 8px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { LayerPanel, TopPanel, LayerItem, Title, Item, Image, Name };
