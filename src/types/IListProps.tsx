import { ISpendingItem } from "./ISpendingItem";

export interface IListProps {
  spendingItems: ISpendingItem[],
  setItems: (value: ISpendingItem[]) => void,
  showError: (value: string) => void,
}