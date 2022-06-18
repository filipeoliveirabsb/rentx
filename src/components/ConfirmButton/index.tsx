import React from 'react';

import {
  Container,
  Title
} from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

export function ConfirmButton({
  title,
  onPress
}){
  return (
    <Container onPress={onPress}>
        <Title>{title}</Title>
    </Container>
  );
}