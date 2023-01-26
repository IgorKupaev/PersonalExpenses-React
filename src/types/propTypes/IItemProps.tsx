import { ISpendingItem } from "./../ISpendingItem";

export interface IItemProps {
  item: ISpendingItem,
  index: string,
  modalInit: (value: string) => void,
  removeInit: (id: string) => void,
  openPage: (item: ISpendingItem) => void
}