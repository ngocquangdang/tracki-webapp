import React, { useState } from 'react';
import { SideBarOutside } from '@Components/sidebars';
import { debounce } from 'lodash';
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
import { AiOutlineSearch } from 'react-icons/ai';
import { InputAdornment } from '@material-ui/core';

interface Props {
  isMobile: boolean;
  show: boolean;
  contacts: object;
  handleClose(): void;
  onSearch(v): void;
  contactIds: Array<number>;
}

export default function SelectContact(props: Props) {
  console.log('SelectContact -> props', props);
  const classes = useStyles();
  const { contacts, show, isMobile, handleClose, onSearch, contactIds } = props;
  const [checked, setPhoneChecked] = useState(true);
  const onChecked = () => setPhoneChecked(!checked);
  const debounceSearch = debounce((v: string) => onSearch(v), 300);

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AiOutlineSearch className={classes.color} />
                </InputAdornment>
              ),
            }}
            onChange={event => debounceSearch(event.target.value)}
          />
        </SearchInput>
        {contactIds?.map((item, index) => (
          <ContactCard
            contact={contacts[item]}
            handleChange={onChecked}
            key={index}
          />
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
