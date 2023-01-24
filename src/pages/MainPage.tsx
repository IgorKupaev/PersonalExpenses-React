import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import Form from './../components/Form'
import ItemsList from './../components/ItemsList'
import Title from './../components/Title'
import { SpendingItem } from './../types/types'

const MainPage: FC = () => {
  const [spendingItems, setSpendingItems] = useState<SpendingItem[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await axios.get<SpendingItem[]>('http://localhost:8000/expenses');
      setSpendingItems(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Title titleText='Учет личных расходов' />
      <Form items={spendingItems} fetch={fetchExpenses} />
      <ItemsList fetch={fetchExpenses} spendingItems={spendingItems} />
    </>
  )
}

export default MainPage