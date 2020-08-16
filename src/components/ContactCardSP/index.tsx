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
  contactSelected?: number[];
  handleChange(value): void;
  contact: any;
}

export default function ContactCard(props: Props) {
  const { contactSelected, handleChange, contact } = props;
  const onChecked = e => () => {
    handleChange(e);
  };
  return (
    <ListItemStyle button key={contact.id}>
      <Card>
        <SelectCard>
          <Checkbox
            checked={contactSelected?.includes(contact.id)}
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
