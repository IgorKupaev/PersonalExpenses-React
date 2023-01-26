import React, { FC, useEffect, useState } from 'react';
import { ISpendingItem } from '../../types/ISpendingItem';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import { Button, CircularProgress } from '@mui/material';
import { fetchItem } from '../../requests/requests';
import styles from './ItemPage.module.scss';

const ItemPage: FC = () => {
  const [item, setItem] = useState<ISpendingItem | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem(params).then((res) => {
      setItem(res || null);
    });
  }, []);
  if (item) {
    return (
      <div>
        <Title titleText='Информация о расходе' />
        <Button onClick={() => navigate('/')} style={{margin: '15px'}} color="success" size="large" variant="contained">Вернуться</Button>
        <div className={styles.itemContainer}>
        <div className="itemId">
            ID расхода: {item?._id}
          </div>
          <div className={styles.itemPlace}>
            Куда было потрачено: {item?.place}
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
        <div className={styles.container}>
        <div>Расход не найден :/</div>
        <CircularProgress color="success" />
        </div>
    </div>
  )
}

export default ItemPage;