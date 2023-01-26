import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { ICustomTextFieldProps } from '../../types/propTypes/ICustomTextFieldProps';
import styles from './CustomTextField.module.scss';

const CustomTextField:FC<ICustomTextFieldProps> = ({defaultValue, onChange, label, type, inputProps}) => {
  return (
    <TextField
      className={styles.field}
      value={defaultValue}
      onChange={e => onChange(e)}
      fullWidth
      id="outlined-basic"
      label={label}
      variant="filled"
      color="success"
      type={type ? type : 'text'}
      inputProps={inputProps ? inputProps : {}}
    />
  )
}

export default CustomTextField;