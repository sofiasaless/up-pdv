import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import Routes from './src/routes';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Home />
    //   <StatusBar style="auto" />
    // </View>
    <Routes />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
