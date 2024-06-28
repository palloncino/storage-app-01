import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// <FlashMessage message="This is a success message!" type="success" />
// <FlashMessage message="Be warned of something." type="warning" />
// <FlashMessage message="An error has occurred." type="error" />
// <FlashMessage message="This is for your information." type="info" />

function FlashMessage({ message, type }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={type}>{message}</Alert>
    </Stack>
  );
}

export default FlashMessage;
