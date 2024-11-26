import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// imports
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function CardEditarMesa() {  
  return (
    <View style={styles.container}>
      <Text style={styles.txtMesa}>MESA 01</Text>
      <TouchableOpacity>
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
    marginBottom: 20
  },
  txtMesa: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold'
  }
});
