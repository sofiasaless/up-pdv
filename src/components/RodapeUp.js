import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function RodapeUp( { cor } ) {
  return (
    <View style={styles.container}>
      <Text style={[styles.texto, {color: (cor)?'#1d3461':'#fff'}]}>Um serviço @UpBusiness0</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 30,
    textAlign: 'center',
  },
  texto: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Barlow-Bold'
  }
});
