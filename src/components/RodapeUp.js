import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function RodapeUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Um serviço @UpBusiness</Text>
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
    fontSize: 15
  }
});
