import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function CardMesa( { status } ) {
  return (
    <View 
      style={
        [styles.container, 
          {
            backgroundColor: (status === 'Ocupada') ? '#e15554':'#3bb273'
          }
        ]
      }
    >
      <Text style={styles.txtMesa}>MESA 01</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a6a6a6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14 ,
    height: 140,
    marginBottom: 20
  },
  txtMesa: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold'
  }
});
