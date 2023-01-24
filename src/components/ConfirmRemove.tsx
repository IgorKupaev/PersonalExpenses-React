import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { FC } from 'react';

interface ConfirmRemoveProps {
  setConfirmRemove: (value: boolean) => void,
  confirmRemove: boolean,
  removeItem: () => void
}

const ConfirmRemove: FC<ConfirmRemoveProps> = ({setConfirmRemove, confirmRemove, removeItem}) => {
  const handlerClick = () => {
    setConfirmRemove(false);
    removeItem();
  }
  return (
    <Dialog onClose={() => setConfirmRemove(false)} open={confirmRemove}>
      <DialogTitle>Удалить расход?</DialogTitle>
      <DialogContent
        style={{display: 'flex', justifyContent: 'space-between'}}
      >
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