import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CardMesa( { status, id } ) {
  // para fazer navegações
  const navigator = useNavigation();
  
  return (
    <TouchableOpacity 
      style={
        [styles.container, 
          {
            backgroundColor: (status === 'Ocupada') ? '#3bb273':'#d3d3d3'
          }
        ]
      }
      onPress={() => {
        navigator.navigate('ResumoConta', {
          idMesa: id
        })
      }}
    >
      <Text style={styles.txtMesa}>MESA {id}</Text>
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
    marginBottom: 20,
    width: '47%'
  },
  txtMesa: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold'
  }
});
