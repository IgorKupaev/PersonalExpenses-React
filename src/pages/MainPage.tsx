import React, { FC, useEffect, useState } from 'react';
import Form from './../components/Form';
import ItemsList from './../components/ItemsList';
import Title from './../components/Title';
import { ISpendingItem } from '../types/ISpendingItem';
import { fetchExpenses } from '../requests/requests';
import SimpleSnackbar from '../components/SimpleSnackbar';

const MainPage: FC = () => {
  const [spendingItems, setSpendingItems] = useState<ISpendingItem[]>([]);
  const [body, setBody] = useState<string>('Ошибка во время загрузки расходов');
  const [open, setOpen] = useState<boolean>(false);

  const showError = (body: string) => {
    setBody(body);
    setOpen(true);
  }

  useEffect(() => {
    fetchExpenses().then((res: ISpendingItem[]) => {
      setSpendingItems(res);
    }).catch(() => {
      setOpen(true);
    })
    
  }, []);

  return (
    <>
      <SimpleSnackbar setOpen={setOpen} open={open} body={body} />
      <Title titleText='Учет личных расходов' />
      <Form showError={showError} setItems={setSpendingItems} items={spendingItems} />
      <ItemsList showError={showError} setItems={setSpendingItems} spendingItems={spendingItems} />
    </>
  )
}

export default MainPage;