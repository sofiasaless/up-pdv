import { StatusBar } from 'expo-status-bar';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DATA } from '../data';
import { TextInput } from 'react-native-gesture-handler';

// componentes
import RodapeUp from '../../components/RodapeUp';
import ItemEditarCardapio from '../../components/ItemEditarCardapio';

// outros imports

export default function EditarCardapio() {
  const data = DATA;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>

        <View style={styles.content}>            
          <View style={styles.novoProduto}>

            <Text style={styles.txt}>Novo produto</Text>
            <TextInput 
              style={styles.inputProduto}
              placeholder='Nome do produto'
              placeholderTextColor={'#d9d9d9'}
              cursorColor={'white'}
              keyboardType='default'
            />

            <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
              <TextInput 
                style={[styles.inputProduto, {flex: 1}]}
                placeholder='Preço'
                placeholderTextColor={'#d9d9d9'}
                cursorColor={'white'}
                keyboardType='default'
              />

              <TouchableOpacity style={styles.btnAdc}>
                <Text style={styles.txtBtn}>Adicionar</Text>
              </TouchableOpacity>
            </View>

          </View>
          
          <View style={styles.excluirProduto}>
            <Text style={styles.txt}>Excluir produto</Text>
            <TextInput 
              style={styles.inputProduto}
              placeholder='Pesquisar'
              placeholderTextColor={'#d9d9d9'}
              cursorColor={'white'}
              keyboardType='default'
            />

            <View style={{height: '60%'}}>
              <FlatList
                style={styles.lista}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({item}) => <ItemEditarCardapio descricao={item.descricao} precoUni={item.precoUni} />}
                keyExtractor={item => Math.random()}
              />
            </View>

            <TouchableOpacity style={styles.btnExc}>
              <Text style={[styles.txtBtn, {color: 'white'}]}>Excluir</Text>
            </TouchableOpacity>
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
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    width: '100%',
    margin: 3
  },
  novoProduto: {
    // backgroundColor: 'red',
    height: '30%',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    gap: 5
  },
  excluirProduto: {
    // backgroundColor: 'green',
    height: '70%',
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  inputProduto: {
    backgroundColor: '#247ba0',
    borderRadius: 5,
    padding: 13,
    color: 'white',
  },
  btnAdc: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#fec601'
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  lista: {
    backgroundColor: '#247ba0',
    marginVertical: 5,
  },
  btnExc: {
    backgroundColor: '#e15554',
    borderRadius: 5,
    justifyContent: 'center',
    width: '50%',
    padding: 7
  }
});
