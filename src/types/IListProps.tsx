import { ISpendingItem } from "./ISpendingItem";

export interface IListProps {
  spendingItems: ISpendingItem[],
  fetch: () => void,
}