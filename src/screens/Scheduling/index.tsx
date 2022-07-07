import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';

import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar, MarkedDateProps, DayProps, generateIntervals } from '../../components/Calendar';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue, 
  Content,
  Footer
} from './styles';

interface Params {
  car: CarDTO;
}
interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling(){
  const [lastSelectedDate, setLastselectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>();

  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental(){
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
      Alert.alert('Selecione o intervalo de locação.');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      });
    }
  }

  function handleBackButton(){
    navigation.goBack()
  }

  function handleChangeDate(date: DayProps){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastselectedDate(end);
    const interval = generateIntervals(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })

  }
;
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
                Escolha uma {'\n'}
                data de início e {'\n'}
                fim do aluguel
            </Title>

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected={!!rentalPeriod.startFormatted}>
                      {rentalPeriod.startFormatted}
                    </DateValue>
                </DateInfo>
                
                <ArrowSvg/>

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormatted}>
                      {rentalPeriod.endFormatted}
                    </DateValue>
                </DateInfo>
            </RentalPeriod>
        </Header>

        <Content>
          <Calendar
            markedDates={markedDates}
            onDayPress={handleChangeDate}
          />
        </Content>

        <Footer>
          <Button
            title="Confirmar"
            onPress={handleConfirmRental}
          />
        </Footer>


    </Container>
  );
}