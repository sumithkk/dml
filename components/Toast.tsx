import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface ToastProps {
  open: boolean;
  onClose: () => void;
  severity: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

const Alert: React.FC<ToastProps> = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert elevation={6} variant="filled" severity={severity} onClose={onClose}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;