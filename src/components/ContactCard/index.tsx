import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import {
  ListItemStyle,
  Card,
  CardContent,
  Content,
  Icon,
  SelectCard,
  useStyles,
} from './styles';
import { MdPhoneIphone, MdEmail } from 'react-icons/md';

interface Props {
  contactSelected?: number[];
  handleChange(value): void;
  contact: any;
}

export default function ContactCard(props: Props) {
  const { contactSelected, handleChange, contact } = props;
  const classes = useStyles();
  const onChecked = e => () => {
    handleChange(e);
  };
  console.log(
    'checked: ',
    contactSelected?.includes(contact.id),
    contact.id,
    contactSelected
  );
  return (
    <ListItemStyle button key={contact.id}>
      <Card>
        <CardContent>
          <Icon>
            {contact.type === 'PHONE' ? (
              <MdPhoneIphone className={classes.icon} />
            ) : (
              <MdEmail className={classes.icon} />
            )}
          </Icon>
          <Content>
            {contact.name} ( {contact.address} )
          </Content>
        </CardContent>
        <SelectCard>
          <Checkbox
            checked={contactSelected?.includes(contact.id)}
            onClick={onChecked(contact.id)}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </SelectCard>
      </Card>
    </ListItemStyle>
  );
}
