import React from 'react';
import Slide from '@material-ui/core/Slide';
import { Content, Container, useStyles } from './styles';
import { Button } from '@material-ui/core';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';

export default function SideBar(props: any) {
  const { opened, onChange } = props;
  const classes = useStyles();

  return (
    <Container opened={opened}>
      <Button
        onClick={onChange}
        className={`${classes.btnIcon} ${classes.absoluteFirst}`}
        style={{ zIndex: opened ? 0 : 1 }}
      >
        <BsFillCaretRightFill />
      </Button>
      <Slide
        direction="right"
        in={opened}
        mountOnEnter
        unmountOnExit
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRight: '2px solid #ddd',
        }}
      >
        <Content style={{ display: opened ? 'block' : 'none' }}>
          {props.children}
          <Button
            onClick={onChange}
            className={`${classes.absolute} ${classes.btnIcon}`}
          >
            <BsFillCaretLeftFill />
          </Button>
        </Content>
      </Slide>
    </Container>
  );
}
