import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import SidebarOut from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import { useStyles } from './styles';

interface Props {
  show: boolean;
  onClose: () => void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function AddContact(props: Props) {
  const classes = useStyles();
  const {
    show,
    // t,
    onClose,
  } = props;

  const onSaveClick = () => {
    console.log('onSaveClick');
    onClose();
  };

  return (
    <SidebarOut
      direction="left"
      show={show}
      title="Add new Contact"
      handleClose={onClose}
      isLogo={true}
      isMobile={true}
    >
      <div className={classes.container}>
        <Button
          text="Add Contact"
          color="primary"
          variant="contained"
          fullWidth
          className={classes.addNewBtn}
          onClick={onSaveClick}
        />
      </div>
    </SidebarOut>
  );
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AddContact);
