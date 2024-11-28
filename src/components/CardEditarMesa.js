import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// imports
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import useDatabaseConfig from '../database/useDatabaseConfig';

export default function CardEditarMesa( {id, reload} ) {  
  const db = useDatabaseConfig();
  
  return (
    <View style={styles.container}>
      <Text style={styles.txtMesa}>MESA {id}</Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Excluir mesa', 'Tem certeza que deseja excluir a mesa?', [
            {
              text: 'Cancelar',
              onPress: () => {
                console.log('exclusão cancelado')
                return;
              },
              style: 'cancel',
            },
            {
              text: 'Confirmar', onPress: async () => {
                db.removerMesa(id);
                reload();
              }
            },
          ])
        }}
      >
        <FontAwesome6 name="trash-can" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    borderRadius: 14 ,
    height: 130,
    marginBottom: 20,
    width: '47%'
  },
  txtMesa: {
    padding: 20,
    fontSize: 30,
    fontFamily: 'Barlow-Bold'
  }
});
