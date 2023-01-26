import axios from "axios";
import { IModalInputs } from "../types/IModalInputs";
import { ISpendingItem } from "../types/ISpendingItem";

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

const checkModalInputs = (item: ISpendingItem, modalInputs: IModalInputs) => {
  return !Object.values(modalInputs).includes(0)
         && !Object.values(modalInputs).includes('')
         && (modalInputs.cost !== item.cost
         || modalInputs.place !== item.place
         || modalInputs.date !== item.date);
}

export const fetchExpenses = async () => {
  const response = await axios.get<ISpendingItem[]>('http://localhost:8000/expenses');
  return response.data;
}

export const fetchItem = async (params: any) => {
  const response = await axios.get<ISpendingItem[]>('http://localhost:8000/expenses');
  let arr = response.data;
  for (let item of arr) {
    if (item._id === params.id) {
      return item;
    }
  }
}

export const postItem = async (reason: string, cost: string) => {
  if (reason && cost) {
    const newItem = {
      place: reason,
      cost: cost,
      date: getFormatedDate()
    }
    await axios.post('http://localhost:8000/expense', newItem);
  }
}

export const deleteItem = async(id: string) => {
  await axios.delete(`http://localhost:8000/expense/${id}`);
}

export const changeItem = async (item: ISpendingItem, modalInputs: IModalInputs) => {
  if (checkModalInputs(item, modalInputs)) {
      const body = {
        ...modalInputs, id: item._id
      }
      await axios.put('http://localhost:8000/expense', body);
  }
}