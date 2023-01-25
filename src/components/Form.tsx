import { Button, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { fetchExpenses, postItem } from '../requests/requests';
import { IFormProps } from '../types/IFormProps';
import { ISpendingItem } from '../types/ISpendingItem';

const getTotal = (arr:ISpendingItem[]) => arr.reduce((acc, item) => acc + Number(item.cost), 0);

const Form: FC<IFormProps> = ({setItems, items, showError}) => {
  const [reason, setReason] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  
  const createItem = async () => {
    await postItem(reason, cost).then(async () => {
      setCost('');
      setReason('');
      await fetchExpenses().then((res) => {
        setItems(res);
      });
    }).catch(() => {
      showError('Ошибка во время добавления расходов');
    })
  }

  return (
    <>
      <div className="form">
        <TextField
          inputProps={{maxLength: 21}}
          onChange={e => setReason(e.target.value)}
          value={reason}
          color='success'
          fullWidth id="outlined-basic"
          label="Куда потрачено"
          variant="outlined"
        />
        <TextField
          inputProps={{max: 9999999, min: 0}}
          onChange={e => setCost(e.target.value)}
          value={cost}
          color='success'
          type='number'
          fullWidth
          id="outlined-basic"
          label="Сколько потрачено"
          variant="outlined"
        />
        <div className="formButtonContainer">
          <Button onClick={createItem} color="success" size="large" variant="contained">
            Добавить
          </Button>
        </div>
      </div>
      <div className="totalCost">
        <span>Итого: {getTotal(items)}₽</span>
      </div>
    </>
  )
}

export default Form;