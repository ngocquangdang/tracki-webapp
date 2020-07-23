import React from 'react';
import { IconButton, Slide } from '@material-ui/core';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import clsx from 'clsx';

import { Content, Container, useStyles } from './styles';

export default function SideBar(props: any) {
  const { opened, onChange } = props;
  const classes = useStyles();

  return (
    <Container opened={opened}>
      <IconButton
        onClick={onChange}
        className={clsx(classes.toggleIconBtn)}
        style={{ zIndex: opened ? 0 : 1 }}
      >
        <BsFillCaretRightFill size={14} />
      </IconButton>
      <Slide
        direction="right"
        in={opened}
        // mountOnEnter
        // unmountOnExit
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRight: '1px solid #rgba(0,0,0,0.12)',
        }}
      >
        <Content opened={opened}>
          {props.children}
          <IconButton
            onClick={onChange}
            className={clsx(classes.toggleIconBtn, classes.closeBtn)}
          >
            <BsFillCaretLeftFill size={14} />
          </IconButton>
        </Content>
      </Slide>
    </Container>
  );
}
