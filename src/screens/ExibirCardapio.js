import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

// componentes
import RodapeUp from '../components/RodapeUp';
import BarraPesquisar from '../components/BarraPesquisar';
import ItemCardapio from '../components/ItemCardapio';

// outros imports
import { DATA } from './data';

export default function ExibirConta() {
  const data = DATA;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        
        <View style={styles.content}>
          <BarraPesquisar />

          <SafeAreaProvider style={{width: '100%'}}>
            <SafeAreaView style={styles.contentLista}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({item}) => <ItemCardapio descricao={item.descricao} precoUni={item.precoUni} />}
                keyExtractor={item => Math.random()}
              />
            </SafeAreaView>

            <View style={styles.viewAdcionar}>
              <TouchableOpacity style={styles.btnAdicionar}>
                <Text 
                  style={{
                    color: 'white',
                    fontSize: 20,
                    padding: 13
                  }}
                >
                  Adicionar
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaProvider>

        </View>

        <RodapeUp/>
        <StatusBar style="light" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d3461',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    flex: 1
  },
  content: {
    backgroundColor: '#fff',
    width: '100%',
    height: '95%',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center'
  },
  contentLista: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '85%'
  },
  viewAdcionar: {
    // backgroundColor: 'red',
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  btnAdicionar: {
    backgroundColor: '#1d3461',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',    
    borderRadius: 10,
    width: '60%'
  }
});
