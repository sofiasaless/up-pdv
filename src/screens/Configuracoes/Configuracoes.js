import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// componentes
import RodapeUp from '../../components/RodapeUp';
import { useNavigation } from '@react-navigation/native';

// outros imports

export default function Configuracoes() {
  // instância para navegar
  const navigator = useNavigation();

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
              <Text style={styles.txtConfig}>Editar/Excluir mesas</Text>
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
              <TouchableOpacity style={styles.btnBackup}>
                <Text style={styles.txtBackup}>Exportar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnBackup}>
                <Text style={styles.txtBackup}>Importar</Text>
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
    fontWeight: 'bold'
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
    fontSize: 15
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
    fontWeight: 'bold'
  },
  viewBackup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  }
});
