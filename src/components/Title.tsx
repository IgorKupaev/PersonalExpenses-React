import React, { FC } from 'react';
import { ITitleProps } from '../types/ITitleProps';

const Title: FC<ITitleProps> = ({titleText}) => <h2 className='title'>{titleText}</h2>;

export default Title;