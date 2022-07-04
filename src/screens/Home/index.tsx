import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api'; 
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load'; 

import {
  Container,
  Header,
  HeaderContent, 
  TotalCars,
  CarList
} from './styles';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  /* const carData = {
    brand: "audi",
    name: "RS 5 Coupé",
    rent: {
        period: "Ao dia",
        price: 120
    },
    thumbnail: "https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png"
  } */

  function handleCarDetails() {
    navigation.navigate('CarDetails')
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  })

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
        { loading ? <Load/> :
        <CarList
          data= {cars}
          keyExtractor={item => item.id}
          renderItem={(item) =>
             <Car data={item} onPress={handleCarDetails}/>
          }
        />
        }
    
    </Container>
  );
}