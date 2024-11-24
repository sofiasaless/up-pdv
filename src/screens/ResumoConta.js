import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';

// componentes
import RodapeUp from '../components/RodapeUp';
import ItemPedido from '../components/ItemPedido';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

// data temporaria
const DATA = [
  {
    "quantidade": 2,
    "descricao": "Coca-cola 2l",
    "precoUni": 9.90
  },
  {
    "quantidade": 1,
    "descricao": "Arroz de leite",
    "precoUni": 12.00
  },
  {
    "quantidade": 3,
    "descricao": "Churrasco de porco",
    "precoUni": 5.50
  },
  {
    "quantidade": 1,
    "descricao": "Baião de dois com queijo e conhaque",
    "precoUni": 16.90
  },
  {
    "quantidade": 1,
    "descricao": "Pizza de calabresa",
    "precoUni": 32.00
  },
  {
    "quantidade": 4,
    "descricao": "Coxinha de frango",
    "precoUni": 4.50
  },
  {
    "quantidade": 2,
    "descricao": "Suco de laranja 500ml",
    "precoUni": 7.00
  },
  {
    "quantidade": 1,
    "descricao": "Hambúrguer artesanal",
    "precoUni": 15.90
  },
  {
    "quantidade": 3,
    "descricao": "Esfirra de carne",
    "precoUni": 3.50
  },
  {
    "quantidade": 5,
    "descricao": "Pastel de queijo",
    "precoUni": 5.00
  },
  {
    "quantidade": 2,
    "descricao": "Refrigerante lata 350ml",
    "precoUni": 6.00
  },
  {
    "quantidade": 1,
    "descricao": "Macarrão ao molho branco",
    "precoUni": 18.50
  },
  {
    "quantidade": 1,
    "descricao": "Bolo de chocolate",
    "precoUni": 10.00
  },
  {
    "quantidade": 3,
    "descricao": "Sorvete de creme",
    "precoUni": 8.50
  }
]

export default function ResumoConta() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.containerIntroducao}>
          <View style={styles.containerTxtMesa}>
            <View>
              <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>MESA 01</Text>
            </View>
          </View>

          <View style={styles.containerTotal}>
            <Text 
              style={{flex: 1, fontSize: 24, fontWeight: 'bold'}}
            >Total</Text>
            <Text 
              style={{fontSize: 24, fontWeight: 'bold'}} 
            >R$ 55,90</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.formProduto}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Produto</Text>
            <TextInput 
              style={styles.inputProduto}
              placeholder='Nome do produto'
              placeholderTextColor={'#d9d9d9'}
              cursorColor={'white'}
              keyboardType='default'
              />
            <View style={styles.formViewInterna}>
              <TextInput
                style={styles.inputInterno} 
                placeholder='Preço'
                placeholderTextColor={'#d9d9d9'}
                cursorColor={'white'}
                keyboardType='numeric'
              />
              <TextInput
                style={styles.inputInterno} 
                placeholder='Quantidade'
                placeholderTextColor={'#d9d9d9'}
                cursorColor={'white'}
                keyboardType='numeric'
              />
              <TouchableOpacity
                style={styles.btnAdicionar}
              >
                <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>Cardápio</Text>
            <TouchableOpacity
              style={styles.btnSelecionarProduto}
            >
              <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: 'white'}}>+   Selecionar produto</Text>
            </TouchableOpacity>

            {/* lista de pedidos da mesa, essa view precisa ter uma altura precisa, ou na vdd vai ser uma flatlist */}
            <SafeAreaProvider>
              <SafeAreaView>
                <FlatList
                  style={styles.containerPedidos}
                  data={DATA}
                  renderItem={({item}) => 
                    <ItemPedido quantidade={item.quantidade} descricao={item.descricao} precoUni={item.precoUni} />
                  }
                  keyExtractor={item => Math.random()}
                />
              </SafeAreaView>

              <View style={styles.btnDeConta}>
                <TouchableOpacity style={[styles.btnEncerrar, {backgroundColor: '#1d3461'}]}>
                  <Text style={styles.txtBtn}>Encerrar conta</Text>
                </TouchableOpacity>

                <View style={styles.btnView}>
                  <TouchableOpacity style={[styles.btnMenor, {backgroundColor: '#3bb273'}]}>
                    <Text style={styles.txtBtn}>Tranferir</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.btnMenor, {backgroundColor: '#e15554'}]}>
                    <Text style={styles.txtBtn}>Excluir</Text>
                  </TouchableOpacity>
                </View>                
              </View>
            </SafeAreaProvider>
          </View>

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
  containerIntroducao: {
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
    width: '90%',
    marginBottom: 20
  },
  containerTxtMesa: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerTotal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: 10,
    width: '100%',
    backgroundColor: '#fec601',
    borderRadius: 5
  },
  content: {
    backgroundColor: '#fff',
    width: '100%',
    height: '77%',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center'
  },
  formProduto: {
    // backgroundColor: 'red',
    width: '90%',
    marginTop: 15,
    gap: 4
  },
  inputProduto: {
    backgroundColor: '#247ba0',
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },
  formViewInterna: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'green',
    gap: 4,
    justifyContent: 'flex-start'
  },
  inputInterno: {
    width: 'auto',
    backgroundColor: '#247ba0',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    flex: 1
  },
  btnAdicionar: {
    width: 'auto',
    backgroundColor: '#1d3461',
    borderRadius: 5,
    padding: 8,
    flex: 1
  },
  btnSelecionarProduto: {
    backgroundColor: '#247ba0',
    width: '100%',
  },
  txtBtn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  containerPedidos: {
    height: '45%'
  },
  btnDeConta: {
    // backgroundColor: 'green',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  btnEncerrar: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    width: '90%'
  },
  btnMenor: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  }
});
