import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar, FlatList} from 'react-native';
import { BackButton } from '../../components/BackButton';
import { CarDTO } from '../../dtos/CarDTO';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load'; 
import { api } from '../../services/api'; 
import { AntDesign } from '@expo/vector-icons';

import {
  Container,
  Header,
  Title, 
  Subtitle, 
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTItle,
  CarFooterPeriod,
  CarFooterDate
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}


export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get(`/schedules_byuser?user_id=1`);
        console.log(response.data);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [])

  function handleBackButton(){
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
            <StatusBar
              barStyle='light-content'
              translucent
              backgroundColor='transparent'
            />
            <BackButton
              onPress={handleBackButton}
              color={theme.colors.shape}
            />
            <Title>
                Seus agendamentos, {'\n'}
                estão aqui
            </Title>
            <Subtitle>
              Conforto, segurança e praticidade.
            </Subtitle>

        </Header>
        { loading ? <Load/> :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item }) => (
              <CarWrapper>
                <Car data={item.car}/>
                <CarFooter>
                  <CarFooterTItle>Período</CarFooterTItle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
        }
    </Container>
  );
}