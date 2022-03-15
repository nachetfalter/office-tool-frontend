import React, { useState } from 'react';
import { Snackbar, Alert, AlertColor, SnackbarCloseReason } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledCard, StyledTitle, StyledButton } from './Interface.styled';

export interface NotificationDetail {
  message: string;
  severity: AlertColor | undefined;
}

interface Prop {
  title: string;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  notificationMessage: NotificationDetail | null;
  setNotificationMessage: (message: NotificationDetail | null) => void;
}

const Interface = ({
  title,
  submitHandler,
  children,
  notificationMessage,
  setNotificationMessage,
}: Prop): JSX.Element => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationDetail, setNotificationDetail] = useState<NotificationDetail>({
    message: 'Process Finished',
    severity: 'success',
  });
  const routeHistory = useNavigate();

  const displayNotification = (notificationDetail: NotificationDetail) => {
    setShowNotification(true);
    setNotificationDetail(notificationDetail);
  };

  // eslint-disable-next-line
  const closeNotificationHandler = (_: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'timeout') {
      setShowNotification(false);
      setNotificationMessage(null);
    }
  };

  const goBackHandler = () => {
    routeHistory(-1);
  };

  if (notificationMessage && !showNotification) {
    displayNotification(notificationMessage);
  }

  return (
    <form onSubmit={submitHandler}>
      <StyledCard>
        <StyledTitle variant="h3">{title}</StyledTitle>
        {children}
        <StyledButton variant="outlined" color="warning" onClick={goBackHandler}>
          Back
        </StyledButton>
      </StyledCard>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showNotification}
        autoHideDuration={1000}
        onClose={closeNotificationHandler}
      >
        <Alert severity={notificationDetail.severity} sx={{ width: '100%' }}>
          {notificationDetail.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Interface;
