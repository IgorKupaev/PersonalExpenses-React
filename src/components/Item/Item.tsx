import { ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { FC, useRef } from 'react';
import MoreIcon from '@mui/icons-material/More';
import styles from './item.module.scss';
import { IItemProps } from '../../types/propTypes/IItemProps';

const Item: FC<IItemProps> = ({item, index, modalInit, removeInit, openPage}) => {
  const clickHandler = () => {
    openPage(item);
  }
  const itemRef = useRef<HTMLSpanElement | null>(null);
  const itemInner = <>{Number(index) + 1}. <span className={styles.placeSpan}>{item.place}</span>, {item.date}, {item.cost}₽</>
  return (
    <ListItem
      id={index}
      divider
    >
      <ListItemText
        primary={itemInner}
      />
      <EditIcon onClick={() => modalInit(index)} className={styles.marginPointer} color='success' />
      <span className={styles.marginPointer} onClick={() => removeInit(index)} ref={itemRef}>
        <DeleteIcon color='success' />
      </span>
      <span className={styles.pointer} onClick={() => clickHandler()}>
        <MoreIcon color='success'/>
      </span>
    </ListItem>
  )
}

export default Item;