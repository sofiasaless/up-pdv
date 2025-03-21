import { StatusBar } from 'expo-status-bar';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as SQLite from 'expo-sqlite';

// componentes
import RodapeUp from '../../components/RodapeUp';
import CardEditarMesa from '../../components/CardEditarMesa';

// outros imports
import useDatabaseConfig from '../../database/useDatabaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Mesa } from '../../model/Mesa';

export default function EditarMesas() {

  const db = useDatabaseConfig();

  // state para guardar as mesas
  const [mesas, setMesas] = useState([]);

  const adicionarNovaMesa = async () => {
    await db.criarNovaMesa();
    Alert.alert('Mesas', 'Nova mesa adicionada com sucesso!');
    recuperarMesas();
  }

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.viewBtn}>
          <View style={styles.containerNovaMesa}>
            <TouchableOpacity style={styles.btnNovaMesa}
              onPress={async () => {
                adicionarNovaMesa();
              }}
            >
              <Text style={{textAlign: 'center', fontSize: 20, color: 'white', alignItems: 'center', fontFamily: 'Barlow-Bold'}}>+ Nova mesa</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>            
          <ScrollView style={styles.contentMesas}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.mesasContainer}>
              {
                mesas.map((m) => (
                  <CardEditarMesa key={m.id} id={m.id} reload={recuperarMesas} />
                ))
              }
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
    height: '83%',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center'
  },
  viewBtn: {
    width: '100%'
  },
  containerNovaMesa: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 18,
  },
  btnNovaMesa: {
    backgroundColor: '#247ba0',
    padding: 10,
    width: '60%',
    borderRadius: 15,
    display: 'flex',
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
