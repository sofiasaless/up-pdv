import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedido } from '../model/Pedido';

export default function ItemPedido({ id, quantidade, descricao, precoUni, total, onCheck }) {
  const [isChecked, setChecked] = useState(false);

  const checking = () => {
    setChecked(!isChecked)
    // console.log(id);
    // console.log(isChecked);
    onCheck(id, new Pedido(id, descricao, precoUni, quantidade, total), isChecked);
  }

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={checking}
        color={'#247ba0'}
      />
      <View style={styles.txtInterno}>
        <Text 
          style={{
            marginHorizontal: 15,
            fontFamily: 'Barlow-Bold',
            fontSize: 17
          }}
        >
          {quantidade}
        </Text>
        <Text 
          style={
            {
              width: '50%',
              textAlign: 'left',
              // backgroundColor: 'blue'
              fontFamily: 'Barlow-Medium',
              fontSize: 17
            }
          }
        >
          {descricao}
        </Text>
        <Text 
          style={
            {
              flex: 0.5,
              textAlign: 'left',
              color: '#737373',
              fontFamily: 'Barlow-Medium',
              fontSize: 17
              // backgroundColor: 'green'
            }
          }
        >
          R$ {precoUni} (U)
        </Text>
        <Text 
          style={
            {
              flex: 0.5,
              textAlign: 'center',
              fontFamily: 'Barlow-Medium',
              fontSize: 17
              // backgroundColor: 'red'
            }
          }
        >
          R$ {total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    marginLeft: 7,
    borderRadius: 5,
  },
  txtInterno: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
