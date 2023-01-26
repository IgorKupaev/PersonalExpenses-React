import React, { FC, useState } from 'react';
import { ISpendingItem } from '../../types/ISpendingItem';
import Item from '../Item/Item';
import Modal from '../Modal/Modal';
import ConfirmRemove from '../ConfirmRemove/ConfirmRemove';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import styles from './ItemList.module.scss';
import { IModalInputs } from '../../types/IModalInputs';
import { IListProps } from '../../types/propTypes/IListProps';
import { changeItem, deleteItem, fetchExpenses as fetch } from '../../requests/requests';

const ItemsList: FC<IListProps> = ({spendingItems, setItems, showError}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [confirmRemove, setConfirmRemove] = useState<boolean>(false);
  const [changeId, setChangeId] = useState<string>('');
  const [removeId, setRemoveId] = useState<string>('');
  const [modalInputs, setModalInputs] = useState<IModalInputs>({
    place: '', cost: 0, date: ''
  })
  
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
    await deleteItem(spendingItems[Number(removeId)]._id).then(async () => {
      await fetch().then((res) => {
        setItems(res);
      });
    }).catch(() => {
      showError('Ошибка во время удаления расходов');
    });
  }

  const openPage = (item: ISpendingItem) => {
    navigate(`/${item._id}`);
  }

  const editItem = async () => {
    let item = spendingItems[Number(changeId)];
    await changeItem(item, modalInputs).then(async () => {
      await fetch().then((res) => {
        setItems(res);
      });
    }).catch(() => {
      showError('Ошибка во время редактирования расходов');
    })
    setModal(false);
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
        <div className={styles.list}>
          {
          spendingItems.map((item, index) => 
              <Item
                openPage={openPage}
                removeInit={removeInit}
                modalInit={modalInit}
                key={item._id}
                item={item}
                index={String(index)}
              />)
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