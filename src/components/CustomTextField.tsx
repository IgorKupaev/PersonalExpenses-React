import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { ICustomTextFieldProps } from '../types/ICustomTextFieldProps';

const CustomTextField:FC<ICustomTextFieldProps> = ({defaultValue, onChange, label, type, inputProps}) => {
  return (
    <TextField
      defaultValue={defaultValue}
      onChange={e => onChange(e)}
      fullWidth
      label={label}
      variant="filled"
      color="success"
      type={type ? type : 'text'}
      inputProps={inputProps ? inputProps : {}}
    />
  )
}

export default CustomTextField;