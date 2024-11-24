import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CardMesa( { status } ) {
  return (
    <TouchableOpacity 
      style={
        [styles.container, 
          {
            backgroundColor: (status === 'Ocupada') ? '#e15554':'#3bb273'
          }
        ]
      }
    >
      <Text style={styles.txtMesa}>MESA 01</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a6a6a6',
    alignItems: 'center',
    justifyContent: 'center',
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
