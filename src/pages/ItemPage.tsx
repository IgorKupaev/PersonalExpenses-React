import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { SpendingItem } from '../types/types';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { Button, CircularProgress } from '@mui/material';

const getShortString = (str: string | undefined) => {
  if (str && str.length > 35) {
    return str.slice(0, 35) + '...  '
  }
  return str;
}

const ItemPage: FC = () => {
  const [item, setItem] = useState<SpendingItem | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchItem();
  }, []);
  async function fetchItem() {
    try {
      const response = await axios.get<SpendingItem[]>('http://localhost:8000/expenses');
      let arr = response.data;
      for (let item of arr) {
        if (item._id === params.id) {
          setItem(item);
        }
      }
    } catch (error) {
    }
  }
  if (item) {
    return (
      <div>
        <Title titleText='Информация о расходе' />
        <Button onClick={() => navigate('/')} style={{margin: '15px'}} color="success" size="large" variant="contained">Вернуться</Button>
        <div className="itemContainer">
        <div className="itemId">
            ID расхода: {item?._id}
          </div>
          <div className="itemPlace">
            Куда было потрачено: {getShortString(item?.place)}
          </div>
          <div className="itemDate">
            Когда было потрачено: {item?.date}
          </div>
          <div className="itemCost">
            Сколько было потрачено: {item?.cost} ₽
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
        <Title titleText='Информация о расходе' />
        <Button onClick={() => navigate('/')} style={{margin: '15px'}} color="success" size="large" variant="contained">Вернуться</Button>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color="success" />
        </div>
    </div>
  )
}

export default ItemPage;