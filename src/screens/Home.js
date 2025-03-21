import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import * as SQLite from 'expo-sqlite';

// componentes
import RodapeUp from '../components/RodapeUp';
import CardMesa from '../components/CardMesa';

// imports
import Octicons from '@expo/vector-icons/Octicons';
import useDatabaseConfig from '../database/useDatabaseConfig';
import { Mesa } from '../model/Mesa';
import { useFonts } from 'expo-font';

import { enableScreens } from 'react-native-screens';
enableScreens();

SplashScreen.preventAutoHideAsync();

export default function Home() {
  // instâncias
  const navigator = useNavigation()
  const db = useDatabaseConfig();

  // state para guardar as mesas
  const [mesas, setMesas] = useState([]);

  // configurações para fonte
  // configurações para pegar a fonte desejada
  const [loaded, error] = useFonts({
    'Barlow-Bold': require('../../assets/fonts/Barlow-Bold.ttf'),
    'Barlow-Regular': require('../../assets/fonts/Barlow-Regular.ttf'),
    'Barlow-Medium': require('../../assets/fonts/Barlow-Medium.ttf'),
  });

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
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
      recuperarMesas();
    },[loaded, error])
  );
  if (!loaded && !error) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.containerIntroducao}>
        <View style={styles.containerTextoOpcao}>
          <View>
            <Text style={{color: 'white', fontSize: 40, fontFamily: 'Barlow-Bold'}}>Up! PDV</Text>
            <Text style={{color: 'white', fontSize: 17, fontFamily: 'Barlow-Regular'}}>Bem-vindo ao seu sistema de vendas!</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate('Configuracoes')
            }}
          >
            <Octicons name="gear" size={27} color="white" />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.containerNovaMesa}>
          <TouchableOpacity style={styles.btnNovaMesa}
            onPress={async () => {
              await db.criarNovaMesa().then(() => {
                Alert.alert('Mesas', 'Nova mesa adicionada com sucesso!');
                recuperarMesas();
              });
              // console.log(mesas)
            }}
          >
            <Text style={{textAlign: 'center', fontSize: 20, color: 'white', alignItems: 'center', fontFamily: 'Barlow-Bold'}}>+ Nova mesa</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      

      <View style={styles.content}>
        <View style={styles.contentIntro}>
          <Text style={styles.txtMesa}>Mesas</Text>
        </View>

        <ScrollView style={styles.contentMesas}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mesasContainer}>
            {
              mesas.map((m) => (
                <CardMesa key={m.id} status={m.status} id={m.id} />
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
  containerIntroducao: {
    display: 'flex',
    // justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: '5%',
    // backgroundColor: 'red',
    width: '90%',
  },
  containerTextoOpcao: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  content: {
    backgroundColor: '#fff',
    width: '100%',
    height: '75%',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center'
  },
  contentIntro: {
    width: '90%',
    // backgroundColor: 'green',
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderRadius: 5
  },
  txtMesa: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Barlow-Medium',
    textTransform: 'uppercase'
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
  ex: {
    backgroundColor: 'orange',
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    width: '45%'
  }
});
