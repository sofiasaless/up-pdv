import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

// componentes
import RodapeUp from '../components/RodapeUp';
import BarraPesquisar from '../components/BarraPesquisar';
import ItemCardapio from '../components/ItemCardapio';

// outros imports
import { DATA } from './data';
import * as SQLite from 'expo-sqlite';
import useDatabaseConfig from '../database/useDatabaseConfig';
import { Pedido } from '../model/Pedido';

export default function ExibirConta() {
  const data = DATA;

  // instâncias
  const database = useDatabaseConfig();

  // states de controle
  const [produtos, setProdutos] = useState([])

  const recuperarProdutos = async () => {
    const db = await SQLite.openDatabaseAsync(database.databaseOnUse, {
      useNewConnection: true
    });

    try {
      const allRows = await db.getAllAsync('SELECT * FROM cardapio');
      let arrayProdutos = [];
      for (const row of allRows) {
        arrayProdutos.push(new Pedido(row.id, row.descricao, row.preco, 1))
      }
      setProdutos(arrayProdutos);
      // console.log('produtos recuperados')
      // console.log(produtos)

    } catch (error) {
      console.log('deu erro tentando recuperar os produtos: ', error)
    } finally {
      db.closeAsync();
    }
  }

  useEffect(() => {
    recuperarProdutos();
  }, [])

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
                data={produtos}
                renderItem={({item}) => <ItemCardapio descricao={item.descricao} precoUni={item.preco} />}
                keyExtractor={item => item.id}
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
