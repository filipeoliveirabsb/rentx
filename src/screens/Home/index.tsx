import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent, 
  TotalCars,
  CarList
} from './styles';

export function Home(){
  const carData = {
    brand: "audi",
    name: "RS 5 Coupé",
    rent: {
        period: "Ao dia",
        price: 120
    },
    thumbnail: "https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png"
  }

/*   const carData2 = {
    brand: "porshe",
    name: "Panamera",
    rent: {
        period: "Ao dia",
        price: 340
    },
    thumbnail: "https://www.mazettoseguros.com.br/blog/wp-content/uploads/2019/10/seguro-panamera-corretora-de-seguros-700x350.png"
  } */

  return (
    <Container>
        <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
        />
        <Header>
          <HeaderContent>

           <Logo
              width={RFValue(108)}
              height={RFValue(12)}
           />
           <TotalCars>
              Total 12 carros 
           </TotalCars> 
          </HeaderContent>
        </Header>

        <CarList
          data= {[1,2,3,4,5,6,7]}
          keyExtractor={item => String(item)}
          renderItem={() => <Car data={carData}/>}
        />
    
    </Container>
  );
}