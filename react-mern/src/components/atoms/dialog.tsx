import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

type Props = {
  title: string;
  message: string;
  textCancel: string;
  textOk: string;
  handleClose: () => void;
  handleOk: () => void;
};
const AlertDialog: React.FC<Props> = ({
  title,
  message,
  textCancel,
  textOk,
  handleClose,
  handleOk,
}: Props): JSX.Element => {
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{textCancel}</Button>
          <Button onClick={handleOk}>{textOk}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
