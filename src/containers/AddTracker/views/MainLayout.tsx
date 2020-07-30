import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { Button } from '@Components/buttons';

import { Container, Logo, Header, Content, useStyles } from './styles';
import { FiChevronLeft } from 'react-icons/fi';

export default function AddTrackerContainer(props: any) {
  const classes = useStyles();

  return (
    <Container>
      <Header>
        <Button
          variant="text"
          classes={classes.backBtn}
          startIcon={<FiChevronLeft size={28} />}
          text={'back'}
          onClick={Router.back}
        />
        <Link href="/">
          <Logo src="/images/logo.png" alt="" />
        </Link>
      </Header>
      <Content>{props.children}</Content>
    </Container>
  );
}
