import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ItemPedido({ id, quantidade, descricao, precoUni, total, onCheck }) {
  const [isChecked, setChecked] = useState(false);

  const checking = () => {
    setChecked(!isChecked)
    // console.log(id);
    // console.log(isChecked);
    onCheck(id, isChecked);
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
            }
          }
        >
          {descricao}
        </Text>
        <Text 
          style={
            {
              flex: 0.5,
              textAlign: 'center',
              color: '#737373'
              // backgroundColor: 'green'
            }
          }
        >
          {precoUni}
        </Text>
        <Text 
          style={
            {
              flex: 0.5,
              textAlign: 'center', 
              // backgroundColor: 'red'
            }
          }
        >
          R$ {total}
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
    padding: 8,
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
