import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

// componentes
import RodapeUp from '../../components/RodapeUp';
import { useNavigation } from '@react-navigation/native';
import useDatabaseConfig from '../../database/useDatabaseConfig';

// outros imports

export default function Configuracoes() {
  // instâncias
  const navigator = useNavigation();
  const db = useDatabaseConfig();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>

        <View style={styles.content}>

          <View style={styles.config}>
            <Text style={styles.txt}>Mesas e cardápio</Text>

            <TouchableOpacity style={styles.btnConfig} onPress={() => navigator.navigate('EditarMesas')}>
              <Text style={styles.txtConfig}>Excluir mesas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnConfig} onPress={() => navigator.navigate('EditarCardapio')}>
              <Text style={styles.txtConfig}>Adicionar novo produto ao cardápio</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.config}>
            <Text style={styles.txt}>Histórico e faturamento</Text>
            
            <TouchableOpacity style={styles.btnConfig}>
              <Text style={styles.txtConfig} onPress={() => navigator.navigate('VendasDoDia')}>Vendas do dia</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnConfig} onPress={() => navigator.navigate('VendasPorPeriodos')}>
              <Text style={styles.txtConfig}>Vendas por períodos</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.config}>
            <Text style={styles.txt}>Backup</Text>

            <View style={styles.viewBackup}>
              <TouchableOpacity style={styles.btnBackup} 
                // onPress={() => db.drop()}
                onPress={async () => {
                  var uri;

                  try {
                    await DocumentPicker.getDocumentAsync().then((r) => {
                      console.log('achou a uri')
                      r.assets.find((e) => {
                        uri = e.uri;
                      })
                    })

                    console.log('uri do arquivo importado: ' + uri);

                    console.log('verificou a existência')
                    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
                      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
                    }

                    // lendo 
                    const base64 = await FileSystem.readAsStringAsync(
                      uri,
                      {
                        encoding: FileSystem.EncodingType.Base64
                      }
                    );

                    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/cantinhoDB', base64, { encoding: FileSystem.EncodingType.Base64 });

                  } catch (error) {
                    console.log('deu erro ao importar o bd: ' + error)
                  }
                }}
              >
                <Text style={styles.txtBackup}>Importar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnBackup} 
                // onPress={() => db.verHistorico()}
                onPress={async () => {
                  if (Platform.OS === "android") {
                    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

                    if (permissions.granted) {
                      const base64 = await FileSystem.readAsStringAsync(
                        FileSystem.documentDirectory + 'SQLite/cantinhoDB',
                        {
                          encoding: FileSystem.EncodingType.Base64
                        }
                      );

                      await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'cantinhoDB', 'application/octet-stream')
                      .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                      })
                      .catch((e) => console.log(e));
                    } else {
                      console.log("Permission not granted");
                    }
                  } else {
                    await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/cantinhoDB');
                  }
                }}
              >
                <Text style={styles.txtBackup}>Exportar</Text>
              </TouchableOpacity>
            </View>

          </View>

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
  txt: {
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'Barlow-Bold'
  },
  config: {
    width: '100%',
    marginVertical: 27,
    gap: 5
  },
  btnConfig: {
    backgroundColor: '#247ba0'
  },
  txtConfig: {
    color: 'white',
    padding: 18,
    fontSize: 17,
    fontFamily: 'Barlow-Medium'
  },
  btnBackup: {
    backgroundColor: '#fec601',
    width: '40%',
    borderRadius: 15
  },
  txtBackup: {
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
    fontFamily: 'Barlow-Bold'
  },
  viewBackup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  }
});
