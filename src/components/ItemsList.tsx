import React, { FC, useState } from 'react'
import { IModalInputs, SpendingItem } from '../types/types'
import Item from './Item'
import axios from 'axios'
import Modal from './Modal'

interface ListProps {
  spendingItems: SpendingItem[],
  fetch: () => void,
}

const ItemsList: FC<ListProps> = ({spendingItems, fetch}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalInputs, setModalInputs] = useState<IModalInputs>({
    place: '', cost: 0, date: ''
  })
  const [changeId, setChangeId] = useState<string>('');

  const modalInit = (id: string) => {
    setChangeId(id);
    setModal(true);
    let changeItem = spendingItems[Number(id)];
    setModalInputs({place: changeItem.place, cost: changeItem.cost, date: changeItem.date});
  }

  const removeItem = async (index: string) => {
    try {
      const id = spendingItems[Number(index)]._id;
      await axios.delete(`http://localhost:8000/expense/${id}`);
      await fetch();
    } catch (error) {
    }
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
  return (
    <div className="list">
      <Modal
        setModalInputs={setModalInputs}
        modalInputs={modalInputs}
        setModal={setModal}
        modal={modal}
        editItem={editItem}
      />
      {spendingItems.map((item, index) => {
        return (
          <Item modalInit={modalInit} remove={removeItem} key={item._id} item={item} index={String(index)} />
        )
      })}
    </div>
  )
}

export default ItemsList