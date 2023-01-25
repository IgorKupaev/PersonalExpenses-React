import React, { FC, useState } from 'react';
import { ISpendingItem } from '../types/ISpendingItem';
import Item from './Item';
import axios from 'axios';
import Modal from './Modal';
import ConfirmRemove from './ConfirmRemove';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import styles from './../styles/progress.module.scss';
import { IModalInputs } from '../types/IModalInputs';
import { IListProps } from '../types/IListProps';

const ItemsList: FC<IListProps> = ({spendingItems, fetch}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [confirmRemove, setConfirmRemove] = useState<boolean>(false);
  const [modalInputs, setModalInputs] = useState<IModalInputs>({
    place: '', cost: 0, date: ''
  })
  const [changeId, setChangeId] = useState<string>('');
  const [removeId, setRemoveId] = useState<string>('');

  const navigate = useNavigate();

  const modalInit = (id: string) => {
    setChangeId(id);
    setModal(true);
    let changeItem = spendingItems[Number(id)];
    setModalInputs({place: changeItem.place, cost: changeItem.cost, date: changeItem.date});
  }

  const removeInit = (id: string) => {
    setRemoveId(id);
    setConfirmRemove(true);
  }

  const removeItem = async () => {
    try {
      const id = spendingItems[Number(removeId)]._id;
      await axios.delete(`http://localhost:8000/expense/${id}`);
      await fetch();
    } catch (error) {
    }
  }

  const openPage = (item: ISpendingItem) => {
    navigate(`/${item._id}`)
  }

  const editItem = async () => {
    try {
      let item = spendingItems[Number(changeId)]
      if (
          // if all of the modal window inputs contains values and one of them is uniq at least
          modalInputs.cost
          && modalInputs.place
          && modalInputs.date
          && (modalInputs.cost !== item.cost
          || modalInputs.place !== item.place
          || modalInputs.date !== item.date)
         ) {
        const body = {
          ...modalInputs, id: spendingItems[Number(changeId)]._id
        }
        await axios.put('http://localhost:8000/expense', body);
        await fetch();
      }
      setModal(false);
    } catch (error) {
    }
  }
  if (spendingItems.length) {
    return (
      <>
        <ConfirmRemove
          confirmRemove={confirmRemove}
          setConfirmRemove={setConfirmRemove}
          removeItem={removeItem}
        />
        <Modal
          setModalInputs={setModalInputs}
          modalInputs={modalInputs}
          setModal={setModal}
          modal={modal}
          editItem={editItem}
        />
        <div className="list">
          {
          spendingItems.map((item, index) => {
            return (
              <Item
                openPage={openPage}
                removeInit={removeInit}
                modalInit={modalInit}
                key={item._id}
                item={item}
                index={String(index)}
              />
            )
          })
          }
        </div>
      </>
    )
  }
  return (
    <>
      <ConfirmRemove
        confirmRemove={confirmRemove}
        setConfirmRemove={setConfirmRemove}
        removeItem={removeItem}
      />
      <Modal
        setModalInputs={setModalInputs}
        modalInputs={modalInputs}
        setModal={setModal}
        modal={modal}
        editItem={editItem}
      />
      <div className={styles.progressContainer} >
        <CircularProgress color="success" />
      </div>
    </>
  )
  
}

export default ItemsList;