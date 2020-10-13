import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { Button } from '@Components/buttons';

import { Container, Logo, Header, Content, useStyles } from './styles';
import { FiChevronLeft } from 'react-icons/fi';

interface Props {
  stepChild: string;
  children: any;
}

export default function AddTrackerContainer(props: Props) {
  const { stepChild, children } = props;
  const classes = useStyles();

  return (
    <Container stepChild={stepChild}>
      <Header>
        <Button
          variant="text"
          classes={classes.backBtn}
          startIcon={<FiChevronLeft size={28} />}
          text={stepChild !== '' ? 'back' : 'Add Tracker'}
          onClick={Router.back}
        />
        <Link href="/">
          <Logo src="/images/logo.png" alt="" />
        </Link>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}
