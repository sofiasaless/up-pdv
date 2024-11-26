import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// componentes
import RodapeUp from '../../components/RodapeUp';
import CardEditarMesa from '../../components/CardEditarMesa';

// outros imports

export default function EditarMesas() {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>

        <View style={styles.content}>            
          <ScrollView style={styles.contentMesas}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.mesasContainer}>
              <CardEditarMesa />
              <CardEditarMesa />
              <CardEditarMesa />
              <CardEditarMesa />
              <CardEditarMesa />
            </View>
          </ScrollView>
          
        </View>

        <RodapeUp cor={true}/>
        <StatusBar style="dark" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    flex: 1
  },
  content: {
    backgroundColor: '#1d3461',
    width: '100%',
    height: '95%',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center'
  },
  contentMesas: {
    // backgroundColor: 'yellow',
    marginTop: 25,
    width: '90%',
  },
  mesasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
