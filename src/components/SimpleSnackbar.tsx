import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { ISimpleSnackbar } from '../types/ISimpleSnackbar';

const SimpleSnackbar: React.FC<ISimpleSnackbar> = ({ open, setOpen, body }) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error">{body}</Alert>
      </Snackbar>
    </div>
  );
}

export default SimpleSnackbar;