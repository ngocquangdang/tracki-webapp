import React from 'react';
import Router from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';

import { HeaderMobile, Logo, useStyles } from './styles';
import { Button } from '@Components/buttons';

export default function Header() {
  const classes = useStyles();
  return (
    <HeaderMobile>
      <Button
        variant="text"
        classes={classes.backBtn}
        startIcon={<FiChevronLeft size={28} />}
        text={'Change Password'}
        onClick={Router.back}
      />
      <Logo src="static/images/logo.png" className={classes.logo} alt="" />
    </HeaderMobile>
  );
}
