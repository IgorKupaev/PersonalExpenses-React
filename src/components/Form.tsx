import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { FC, useState } from 'react'
import { SpendingItem } from '../types/types';

interface FormProps {
  fetch: () => void,
  items: SpendingItem[]
}

const getFormatedDate = () => {
  let year = new Date().getFullYear();
  let day = String(new Date().getDate());
  let month = String(new Date().getMonth() + 1);
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

const getTotal = (arr:SpendingItem[]) => arr.reduce((acc, item) => acc + Number(item.cost), 0);

const Form: FC<FormProps> = ({fetch, items}) => {
  const [reason, setReason] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  
  const createItem = async () => {
    if (reason && cost) {
      try {
        const newItem = {
          place: reason,
          cost: cost,
          date: getFormatedDate()
        }
        await axios.post('http://localhost:8000/expense', newItem);
        await fetch();
        setCost('');
        setReason('');
      } catch (error) {
      }
    }
  }

  return (
    <>
      <div className="form">
        <TextField
          onChange={e => setReason(e.target.value)}
          value={reason}
          color='success'
          fullWidth id="outlined-basic"
          label="Куда потрачено"
          variant="outlined"
        />
        <TextField
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

export default Form