import React from 'react';
import { debounce } from 'lodash';
import {
  Container,
  Content,
  SearchInput,
  TextInput,
  useStyles,
} from './styles';

interface Props {
  children: any;
  value?: number;
  index?: number;
  placeholder: string;
  searchTrackersRequest: any;
}
export default function TabPanel(props: Props) {
  const classes = useStyles();
  const {
    children,
    value,
    index,
    placeholder,
    searchTrackersRequest,
    ...other
  } = props;
  const debounceSearch = debounce(
    (v: string | null) => searchTrackersRequest(v),
    300
  );
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Container>
          <SearchInput>
            <TextInput
              placeholder={`${placeholder}`}
              variant="outlined"
              type="search"
              InputProps={{
                classes: { root: classes.inputRoot, input: classes.input },
              }}
              onChange={event => debounceSearch(event.target.value)}
            />
          </SearchInput>
          <Content>{children}</Content>
        </Container>
      )}
    </div>
  );
}
