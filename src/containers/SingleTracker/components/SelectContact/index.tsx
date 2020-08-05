import React, { useState } from 'react';
import { SideBarOutside } from '@Components/sidebars';
// import { debounce } from 'lodash';
import ContactCard from '@Components/ContactCard';
import { Button } from '@Components/buttons';
import { FiPlus } from 'react-icons/fi';

import {
  SelectContactContainer,
  SearchInput,
  TextInput,
  Save,
  useStyles,
} from './styles';

// const ListContact = [
//   {
//     id: 110948,
//     type: 'PHONE',
//     name: 'Rahul',
//     address: '+2139355591089',
//     notificationType: 'PHONE',
//   },
//   {
//     id: 119573,
//     type: 'PHONE',
//     name: 'testnumsms',
//     address: '+639214638852',
//     notificationType: 'PHONE',
//   },
//   {
//     id: 114201,
//     type: 'EMAIL',
//     name: 'hdhshsn',
//     address: 'bdhsb@gmail.com',
//     notificationType: 'EMAIL',
//   },
//   {
//     id: 113689,
//     type: 'EMAIL',
//     name: 'gag',
//     address: 'gsgs@gmail.com',
//     notificationType: 'EMAIL',
//   },
//   {
//     id: 113688,
//     type: 'EMAIL',
//     name: 'haha',
//     address: 'hshhshs@gmail.com',
//     notificationType: 'EMAIL',
//   },
//   {
//     id: 108793,
//     type: 'EMAIL',
//     name: 'Rahul Malhotra',
//     address: 'rahul.malhotra@qualhon.com',
//     notificationType: 'EMAIL',
//   },
//   {
//     id: 114097,
//     type: 'EMAIL',
//     name: 'sanderford',
//     address: 'sander@gmail.com',
//     notificationType: 'EMAIL',
//   },
//   {
//     id: 114366,
//     type: 'EMAIL',
//     name: 'Bgtf',
//     address: 'sbsb@gmai.com',
//     notificationType: 'EMAIL',
//   },
//   {
//     id: 113691,
//     type: 'EMAIL',
//     name: 'shaved',
//     address: 'shhs@gmail.com',
//     notificationType: 'EMAIL',
//   },
//   {
//     id: 119572,
//     type: 'EMAIL',
//     name: 'test1',
//     address: 'testconract@gmail.com',
//     notificationType: 'EMAIL',
//   },
//   {
//     id: 119577,
//     type: 'EMAIL',
//     name: 'testerman',
//     address: 'testerman@gnail.com',
//     notificationType: 'EMAIL',
//   },
// ];

export default function SelectContact(props) {
  const classes = useStyles();
  const { contactList } = props;
  const [checked, setPhoneChecked] = useState(true);
  const onChecked = () => setPhoneChecked(!checked);
  // const debounceSearch = debounce((v: string) => onSearch(v), 300);

  return (
    <SideBarOutside
      title="Select Contacts to Add"
      button={
        <Button
          className={`${classes.addBtn} ${classes.margin}`}
          variant="outlined"
          color="primary"
          startIcon={<FiPlus />}
          text={'add'}
        />
      }
      show={props.show}
      direction="right"
      handleClose={props.handleClose}
      isMobile={props.isMobile}
    >
      <SelectContactContainer>
        <SearchInput>
          <TextInput
            // placeholder={`${placeholder}`}
            variant="outlined"
            type="search"
            // InputProps={{
            //   classes: { root: classes.inputRoot, input: classes.input },
            // }}
            // onChange={event => debounceSearch(event.target.value)}
          />
        </SearchInput>
        {contactList.map((item, index) => (
          <ContactCard contact={item} handleChange={onChecked} key={index} />
        ))}
        <Save>
          <Button
            className={`${classes.btn} ${classes.margin}`}
            variant="outlined"
            // isLoading={isRequesting}
            text={'save'}
            type="submit"
          />
        </Save>
      </SelectContactContainer>
    </SideBarOutside>
  );
}
