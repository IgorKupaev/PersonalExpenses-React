import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import styles from './../styles/ConfirmRemove.module.scss';

interface IConfirmRemoveProps {
  setConfirmRemove: (value: boolean) => void,
  confirmRemove: boolean,
  removeItem: () => void
}

const ConfirmRemove: FC<IConfirmRemoveProps> = ({setConfirmRemove, confirmRemove, removeItem}) => {
  const handlerClick = () => {
    setConfirmRemove(false);
    removeItem();
  }
  return (
    <Dialog onClose={() => setConfirmRemove(false)} open={confirmRemove}>
      <DialogTitle>Удалить расход?</DialogTitle>
      <DialogContent className={styles.dialogContent}>
      <Button
        onClick={() => setConfirmRemove(false)}
        color='success'
        variant="contained"
      >
        Нет
      </Button>
      <Button
        onClick={handlerClick}
        color='error'
        variant="contained"
      >
        Да
      </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmRemove;