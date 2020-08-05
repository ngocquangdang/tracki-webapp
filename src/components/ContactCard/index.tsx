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
  checked?: boolean;
  handleChange?(): void;
  contact?: any;
}

export default function ContactCard(props: Props) {
  const { checked, handleChange, contact } = props;
  const classes = useStyles();
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
            checked={checked}
            onChange={handleChange}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </SelectCard>
      </Card>
    </ListItemStyle>
  );
}
