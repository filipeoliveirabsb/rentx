import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header
} from './styles';

export function CarDetails(){
  return (
    <Container>
        <Header>
            <BackButton
              onPress={() => {}}
            />
        </Header>

        <ImageSlider
          imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}
        />

    </Container>
  );
}