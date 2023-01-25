export interface ISimpleSnackbar {
  open: boolean,
  setOpen: (value: boolean) => void,
  body: string,
}