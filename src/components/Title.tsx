import React, { FC } from 'react';

interface TitleProps {
  titleText: string
}

const Title: FC<TitleProps> = ({titleText}) => <h2 className='title'>{titleText}</h2>;

export default Title;