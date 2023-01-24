export interface SpendingItem {
  _id: string,
  place: string,
  date: string,
  cost: number
}

export interface IModalInputs {
  place: string,
  cost: number,
  date: string
}