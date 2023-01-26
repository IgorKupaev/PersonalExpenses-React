import { IModalInputs } from "./../IModalInputs";

export interface IModalProps {
  modal: boolean,
  setModal: (value: boolean) => void,
  modalInputs: IModalInputs,
  setModalInputs: (value: IModalInputs) => void,
  editItem: () => void
}