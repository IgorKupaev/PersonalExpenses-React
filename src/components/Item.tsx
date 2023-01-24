import { ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { FC, useRef } from 'react';
import { SpendingItem } from '../types/types';

interface itemProps {
  item: SpendingItem,
  index: string,
  modalInit: (value: string) => void,
  removeInit: (id: string) => void,
}

const getShortString = (str: string) => {
  if (str.length > 20) {
    return str.slice(0, 20) + '...  '
  }
  return str;
}

const Item: FC<itemProps> = ({item, index, modalInit, removeInit}) => {
  const itemRef = useRef<HTMLSpanElement | null>(null);
  return (
    <ListItem
      id={index}
      style={{background: "#fafafa"}}
      divider
    >
      <ListItemText
        primary={`${Number(index) + 1}. ${getShortString(item.place)}, ${item.date}, ${item.cost}₽`}
      />
      <EditIcon onClick={() => modalInit(index)} style={{cursor: 'pointer', marginRight: 7}} color='success' />
      <span onClick={() => removeInit(index)} ref={itemRef}>
        <DeleteIcon  style={{cursor: 'pointer'}} color='success' />
      </span>
    </ListItem>
  )
}

export default Item;