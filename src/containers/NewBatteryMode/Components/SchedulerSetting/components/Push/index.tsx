import React from 'react';
import Modal from '@Components/modals';

export default function PushSetting(props) {
  const { notificationPush, handleCloseNotificationPush } = props;
  return (
    <div>
      <Modal
        title="Notifications"
        open={notificationPush}
        handleClose={handleCloseNotificationPush}
      >
        <>xxxx</>
      </Modal>
    </div>
  );
}
