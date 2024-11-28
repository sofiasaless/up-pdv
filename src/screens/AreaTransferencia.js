import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import * as SQLite from 'expo-sqlite';

// componentes
import RodapeUp from '../components/RodapeUp';
import CardMesaTransferencia from '../components/CardMesaTransferencia';

// imports
import Octicons from '@expo/vector-icons/Octicons';
import useDatabaseConfig from '../database/useDatabaseConfig';
import { Mesa } from '../model/Mesa';

export default function AreaTransferencia( { route } ) {
  // instâncias
  const navigator = useNavigation()
  const db = useDatabaseConfig();

  // parametros
  const pedidos = route.params.pedidos
  const idMesaOrigem = route.params.mesaOrigem

  // state para guardar as mesas
  const [mesas, setMesas] = useState([]);

  const recuperarMesas = async () => {
    const database = await SQLite.openDatabaseAsync(db.databaseOnUse, {
      useNewConnection: true
    });

    // console.log('na funcao de recuperar')
    try {
      const allRows = await database.getAllAsync('SELECT * FROM mesas');

      setMesas([])
      let arrayMesas = []
      for (const row of allRows) {
        arrayMesas.push(new Mesa(row.id, row.status, row.pedidos));
      }

      setMesas(arrayMesas);

      // console.log('mesas recuperadas com sucesso: ', mesas)
    } catch (error) {
      console.log('erro ao recuperar as mesas: ', error)
      setMesas([])
    } finally {
      database.closeAsync();
    }
  }

  useFocusEffect(
    useCallback(() => {
      recuperarMesas();
    },[])
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <ScrollView style={styles.contentMesas}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mesasContainer}>
            {
              mesas.map((m) => (
                <CardMesaTransferencia key={m.id} status={m.status} id={m.id} pedidosTransferidos={pedidos} mesaOrigem={idMesaOrigem} />
              ))
            }
          </View>
        </ScrollView>

      </View>

      <RodapeUp/>
      
      <StatusBar style="light" />
    </View>
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
  contentMesas: {
    // backgroundColor: 'yellow',
    marginTop: 25,
    width: '90%',
  },
  mesasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});
