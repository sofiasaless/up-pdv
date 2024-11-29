import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

// componentes
import RodapeUp from '../../components/RodapeUp';
import ItemEditarCardapio from '../../components/ItemEditarCardapio';

// outros imports
import * as SQLite from 'expo-sqlite';
import useDatabaseConfig from '../../database/useDatabaseConfig';
import { Pedido } from '../../model/Pedido';
import useConvertors from '../../util/useConvertors';

export default function EditarCardapio() {

  // instância
  const database = useDatabaseConfig();
  const util = useConvertors();

  // states para adição
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState(0)

  // assegurandor para preencher campos
  const handlePreencherCampos = () => {
    return (descricao === '' || preco === 0 || preco === '')
  }

  const limparCampos = () => {
    setDescricao('')
    setPreco(0)
  }

  const adicionarValidoNoCardapio = async () => {
    // testando se é isNaN
    if (isNaN(util.formatadorNumerico(preco)) || util.formatadorNumerico(preco) === 0) {
      Alert.alert('Não foi possível adicionar produto ao cardápio!', 'O preço adicionado não é um número válido!', 
      [
        {
          text: 'OK'
        }
      ])
      return;
    }

    await database.adicionarNoCardapio(descricao, util.formatadorNumerico(preco));
    recuperarProdutos();
    Alert.alert('Sucesso!', 'Produto registrado no cardápio com sucesso!', 
    [
      {
        text: 'OK',
        onPress: () => {
          limparCampos();
        }
      }
    ])
  }

  // states para controle
  const [produtos, setProdutos] = useState([])
  const [produtosFiltrados, setProdutosFiltrados] = useState([])
  const [produtosEscolhidos, setProdutosEscolhidos] = useState([])

  // fazendo a pesquisa
  const pesquisarPorProduto = (text) => {
    // console.log(text)
    const prod = produtos.filter(item =>
      item.descricao.toLowerCase().includes(text.toLowerCase())
    );
    setProdutosFiltrados(prod);
  }

  // produtos para exclusão
  const produtosSelecionadosParaExclusao = (acao, idProd) => {
    // console.log('o componente ta selecionado? ', acao);
    if (!acao) {
      let newArray = []
      newArray = produtosEscolhidos
      newArray.push(idProd);
      setProdutosEscolhidos(newArray);
    } else {
      let index = produtosEscolhidos.findIndex(prod => prod === idProd);
      produtosEscolhidos.splice(index, 1);
    }

    // console.log('array com id de produtos escolhidos')
    // console.log(produtosEscolhidos)
  }

  const excluindoProdutosSelecionados = () => {
    produtosEscolhidos.forEach(async (p) => {
      await database.removerProduto(p);
    });

    recuperarProdutos();
  }

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
      setProdutosFiltrados(arrayProdutos);

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
          <View style={styles.novoProduto}>

            <Text style={styles.txt}>Novo produto</Text>
            <TextInput 
              style={styles.inputProduto}
              placeholder='Nome do produto'
              placeholderTextColor={'#d9d9d9'}
              cursorColor={'white'}
              keyboardType='default'
              onChangeText={setDescricao}
              value={descricao}
            />

            <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
              <TextInput 
                style={[styles.inputProduto, {flex: 1}]}
                placeholder='Preço'
                placeholderTextColor={'#d9d9d9'}
                cursorColor={'white'}
                keyboardType='numeric'
                onChangeText={setPreco}
                value={preco}
              />

              <TouchableOpacity style={styles.btnAdc}
                onPress={async () => {
                  handlePreencherCampos()
                  ?
                  Alert.alert('Não foi possível adicionar produto ao pedido!', 'Preencha a descrição e o valor para adicionar o produto no cardápio!', 
                  [
                    {
                      text: 'OK'
                    }
                  ])
                  :
                  adicionarValidoNoCardapio();
                }}
              >
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
              onChangeText={pesquisarPorProduto}
            />

            <View style={{height: '60%'}}>
              <FlatList
                style={styles.lista}
                showsVerticalScrollIndicator={false}
                data={produtosFiltrados}
                renderItem={({item}) => <ItemEditarCardapio id={item.id} descricao={item.descricao} precoUni={item.preco} controleSelecao={produtosSelecionadosParaExclusao} />}
                keyExtractor={item => Math.random()}
              />
            </View>

            <TouchableOpacity style={styles.btnExc}
              onPress={() => {
                Alert.alert('Excluir produtos selecionados', 'Tem certeza que deseja esses proudtos? Eles não poderão ser recuperados.', [
                  {
                    text: 'Cancelar',
                    onPress: () => {
                      console.log('encerramento cancelado')
                      return;
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'Confirmar', onPress: () => {
                      excluindoProdutosSelecionados();
                    }
                  },
                ])
              }}
            >
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
    fontSize: 20,
    textTransform: 'uppercase',
    width: '100%',
    margin: 3,
    fontFamily: 'Barlow-Bold'
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
    fontFamily: 'Barlow-Bold'
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
