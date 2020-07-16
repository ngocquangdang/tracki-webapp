import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styles';
import { Button } from '@material-ui/core';
import { BsFillCaretLeftFill } from 'react-icons/bs';
export default function Page(props: any) {
  const classes = useStyles();

  return (
    <Paper className={classes.border}>
      {props.children}
      {/* <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              className={classes.heightTab}
            >
              <TabStyle label="Trackers" />
              <TabStyle label="Geo-Fence" />
            </Tabs> */}
      <Button
        // onClick={handleChangee}
        className={`${classes.absolute} ${classes.btnIcon}`}
      >
        <BsFillCaretLeftFill />
      </Button>
    </Paper>
  );
}
