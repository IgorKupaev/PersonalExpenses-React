import { ListItem, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import React, { FC, useRef } from 'react'
import { SpendingItem } from '../types/types';

interface itemProps {
  item: SpendingItem,
  index: string,
  remove: (id: string) => void,
  modalInit: (value: string) => void
}

const Item: FC<itemProps> = ({item, index, remove, modalInit}) => {
  const itemRef = useRef<HTMLSpanElement | null>(null);
  const clickHandler = async (e: React.MouseEvent) => {
    try {
      let index = e.currentTarget.parentElement?.id;
      await remove(String(index));
    } catch (error) {
    }
  }
  return (
    <ListItem
      id={index}
      style={{background: "#cddcfe"}}
      divider
    >
      <ListItemText
        primary={`${Number(index) + 1}. ${item.place}, ${item.date}, ${item.cost}₽`}
      />
      <EditIcon onClick={() => modalInit(index)} style={{cursor: 'pointer', marginRight: 7}} color='secondary' />
      <span onClick={clickHandler} ref={itemRef}>
        <DeleteIcon  style={{cursor: 'pointer'}} color='secondary' />
      </span>
    </ListItem>
  )
}

export default Item