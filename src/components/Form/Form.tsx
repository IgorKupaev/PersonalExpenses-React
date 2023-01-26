import { Button, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { fetchExpenses, postItem } from '../../requests/requests';
import { IFormProps } from '../../types/propTypes/IFormProps';
import { ISpendingItem } from '../../types/ISpendingItem';
import styles from './Form.module.scss';
import CustomTextField from '../CustomTextField/CustomTextField';

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
      <div className={styles.form}>
        <CustomTextField
          inputProps={{maxLength: 21}}
          onChange={e => setReason(e.currentTarget.value)}
          label="Куда потрачено"
          defaultValue={reason}
        />
        <CustomTextField
          inputProps={{max: 9999999, min: 0}}
          onChange={e => setCost(e.currentTarget.value)}
          label="Сколько потрачено"
          type='number'
          defaultValue={cost}
        />
        <div className={styles.formButtonContainer}>
          <Button onClick={createItem} color="success" size="large" variant="contained">
            Добавить
          </Button>
        </div>
      </div>
      <div className={styles.totalCost}>
        <span>Итого: {getTotal(items)}₽</span>
      </div>
    </>
  )
}

export default Form;