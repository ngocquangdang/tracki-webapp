import React from 'react';

import {
  Container,
  Content,
  SearchInput,
  TextInput,
  useStyles,
} from './styles';

interface Props {
  children: Element;
  value?: number;
  index?: number;
  placeholder: string;
}
export default function TabPanel(props: Props) {
  const classes = useStyles();
  const { children, value, index, placeholder, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Container>
          <SearchInput>
            <TextInput
              placeholder={`${placeholder}`}
              variant="outlined"
              color="secondary"
              type="search"
              InputProps={{ classes: { input: classes.input } }}
            />
          </SearchInput>
          <Content>{children}</Content>
        </Container>
      )}
    </div>
  );
}
