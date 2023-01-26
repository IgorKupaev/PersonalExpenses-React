import React, { FC } from 'react';
import { ITitleProps } from '../../types/ITitleProps';
import styles from './Title.module.scss';

const Title: FC<ITitleProps> = ({titleText}) => <h2 className={styles.title}>{titleText}</h2>;

export default Title;