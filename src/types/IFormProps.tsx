import { ISpendingItem } from "./ISpendingItem";

export interface IFormProps {
  fetch: () => void,
  items: ISpendingItem[]
}