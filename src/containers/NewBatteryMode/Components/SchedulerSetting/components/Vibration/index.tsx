import React from 'react';
import Modal from '@Components/modals';

export default function VibrationSetting(props) {
  const { notificationVibration, handleCloseNotificationVibration } = props;
  return (
    <div>
      <Modal
        title="Notifications"
        open={notificationVibration}
        handleClose={handleCloseNotificationVibration}
      >
        <>xxxx</>
      </Modal>
    </div>
  );
}
