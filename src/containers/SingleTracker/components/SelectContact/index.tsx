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

interface Props {
  isMobile: boolean;
  show: boolean;
  contacts: object;
  handleClose(): void;
  selectedContacts?: number[];
}

export default function SelectContact(props: Props) {
  const classes = useStyles();
  const { contacts, show, isMobile, handleClose } = props;
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
      show={show}
      direction="right"
      handleClose={handleClose}
      isMobile={isMobile}
    >
      <SelectContactContainer>
        <SearchInput>
          <TextInput
            placeholder={'Search contact by Name'}
            variant="outlined"
            type="search"
            // InputProps={{
            //   classes: { root: classes.inputRoot, input: classes.input },
            // }}
            // onChange={event => debounceSearch(event.target.value)}
          />
        </SearchInput>
        {Object.values(contacts).map((item, index) => (
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
