import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { Button } from '@Components/buttons';

import { Container, Logo, Header, Content, useStyles } from './styles';
import { FiChevronLeft } from 'react-icons/fi';

interface Props {
  stepChild: string;
  children: any;
  steps: any;
}

export default function AddTrackerContainer(props: Props) {
  const { stepChild, children, steps } = props;
  const classes = useStyles();

  const handleBack = () => {
    Router.back();
  };

  return (
    <Container stepChild={stepChild}>
      <Header>
        <Button
          variant="text"
          classes={classes.backBtn}
          startIcon={<FiChevronLeft size={28} />}
          text={stepChild !== '' || steps.length > 0 ? 'Back' : 'Add Tracker'}
          onClick={handleBack}
        />
        <Link href="/">
          <Logo src="static/images/logo.png" alt="" />
        </Link>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}
