import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import {
  ListItemStyle,
  Card,
  CardContent,
  Content,
  SelectCard,
} from './styles';

interface Props {
  checked?: boolean;
  handleChange(value): void;
  contact: any;
}

export default function ContactCard(props: Props) {
  const { checked, handleChange, contact } = props;
  const onChecked = e => () => {
    handleChange(e);
  };
  return (
    <ListItemStyle button key={contact.id}>
      <Card>
        <SelectCard>
          <Checkbox
            checked={checked}
            onClick={onChecked(contact.id)}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </SelectCard>
        <CardContent>
          <Content>
            {contact.name} ( {contact.address} )
          </Content>
        </CardContent>
      </Card>
    </ListItemStyle>
  );
}
