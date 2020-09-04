import React from 'react';
import { IconButton, Slide } from '@material-ui/core';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import clsx from 'clsx';

import { Content, SideBarContainer, useStyles } from './styles';

export default function SideBar(props: any) {
  const { opened, onChange } = props;
  const classes = useStyles();

  return (
    <SideBarContainer isOpen={opened}>
      <Slide
        direction="right"
        in={opened}
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRight: '1px solid #rgba(0,0,0,0.12)',
          visibility: 'unset',
          display: 'block',
        }}
      >
        <Content>
          {props.children}
          <IconButton
            onClick={onChange}
            className={clsx(classes.toggleIconBtn)}
          >
            {opened ? (
              <BsFillCaretLeftFill size={14} />
            ) : (
              <BsFillCaretRightFill size={14} />
            )}
          </IconButton>
        </Content>
      </Slide>
    </SideBarContainer>
  );
}
