import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ItemEditarCardapio( {descricao, precoUni} ) {

  return (
    <View style={styles.itemCardapio}>
      <TouchableOpacity style={styles.infoItem}>
        <Text style={styles.txtDescricao}>{descricao}</Text>
        <Text style={styles.txtPreco}>R$ {precoUni}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemCardapio: {
    backgroundColor: '#1d3461',
    margin: 3,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  infoItem: {
    // backgroundColor: '#247ba0',
    borderRadius: 3,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%'
  },
  txtDescricao: {
    color: 'white',
    fontSize: 18,
    // backgroundColor: 'green'
  },
  txtPreco: {
    color: 'white',
    fontSize: 18,
    // backgroundColor: 'red'
  }
});
