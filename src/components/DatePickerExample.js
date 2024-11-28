import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// componente de selecionar data pelo calendário, mas é infuncional tentando usar em outros componentes (vou concertar isso)
export default function DatePickerExample({ title, setingDate, fontSize }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setShowPicker(false);
      setingDate(currentDate.toLocaleDateString())
      return;
    }
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    // setingDate(currentDate.toLocaleDateString())
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker} style={styles.data}>
        <Text style={[styles.title, {fontSize: fontSize?fontSize:11}]}>{title}</Text>
      </TouchableOpacity>

      {
        showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}

          />
        )
      }

    </View >
  );
}

const styles = StyleSheet.create({
  data: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 35,
  },
  title:{
    color: 'white',
    padding: 5
    // fontFamily: 'Poppins-Bold',
    // fontSize: 11
  }
});