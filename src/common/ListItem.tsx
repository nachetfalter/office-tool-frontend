import React from 'react';
import ItemContainer from './ListItem.styled';

export interface Props {
  children: React.ReactNode;
  className?: string;
}

const ListItem = ({ children, className }: Props): JSX.Element => {
  return <ItemContainer className={className}>{children}</ItemContainer>;
};

export default ListItem;
