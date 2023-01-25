import { ISpendingItem } from "./ISpendingItem";

export interface IFormProps {
  items: ISpendingItem[],
  setItems: (items: ISpendingItem[]) => void,
  showError: (body: string) => void,
}