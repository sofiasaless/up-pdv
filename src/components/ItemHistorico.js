import { StyleSheet, Text, View } from 'react-native';

export default function ItemPedido({ quantidade, descricao, precoUni, total }) {

  return (
    <View style={styles.container}>
      <View style={styles.txtInterno}>
        <Text 
          style={{
            marginHorizontal: 15,
            fontFamily: 'Barlow-Bold',
            fontSize: 15
          }}
        >
          {quantidade}
        </Text>
        <Text 
          style={
            {
              width: '50%',
              textAlign: 'left',
              fontFamily: 'Barlow-Medium',
              fontSize: 15
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
              textAlign: 'left',
              color: '#737373',
              fontFamily: 'Barlow-Medium',
              fontSize: 15
              // backgroundColor: 'green'
            }
          }
        >
          R$ {precoUni.toFixed(2)} (U)
        </Text>
        <Text 
          style={
            {
              flex: 0.5,
              textAlign: 'center', 
              fontFamily: 'Barlow-Medium',
              fontSize: 15
              // backgroundColor: 'red'
            }
          }
        >
          R$ {(precoUni * quantidade).toFixed(2)}
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
