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
import * as SQLite from 'expo-sqlite';
import useDatabaseConfig from '../database/useDatabaseConfig';
import { Pedido } from '../model/Pedido';
import { useNavigation } from '@react-navigation/native';

export default function ExibirConta( { route } ) {

  // parametros da rota pra controle da mesa
  const id = route.params.idMesa;

  // instâncias
  const navigator = useNavigation();
  const database = useDatabaseConfig();

  // states de controle
  const [produtos, setProdutos] = useState([])
  const [produtosFiltrados, setProdutosFiltrados] = useState([])
  const [produtosSelecionados, setProdutosSelecionados] = useState([]) // esse state vai guardar os produtos que o usuário selecionar e clicar
  const [pedidos, setPedidos] = useState([])

  // função para fazer a filtração dos produtos de acordo com a pesquisa no search
  // vou exportar essa função para o componente para ser usada dentro dele
  const pesquisarPorProduto = (pesquisa) => {
    const filtrados = produtos.filter(item =>
      item.descricao.toLowerCase().includes(pesquisa.toLowerCase())
    );
    setProdutosFiltrados(filtrados);
  };

  // guardando os produtos selecionados no array
  const adicionarProdutoSelecionado = (inserir, produto) => {  
    if (inserir) {
      let arrayProdutosSelecionados = []
      arrayProdutosSelecionados = produtosSelecionados
      arrayProdutosSelecionados.push(produto);
      setProdutosSelecionados(arrayProdutosSelecionados);
    } else { // se for negativo, significa que o produto nao esta mais selecionado e deve ser retirado dos produtos selecionados
      let index = produtosSelecionados.findIndex(prod => prod.id === produto.id);
      produtosSelecionados.splice(index, 1);
    }
  }

  const atualizarQuantidade = (produto, novaQtd, action) => {
    let index = produtosSelecionados.findIndex(prod => prod.id === produto);
    produtosSelecionados[index].quantidade = novaQtd + ((action)?1:-1)
    produtosSelecionados[index].total = produtosSelecionados[index].preco * (novaQtd + ((action)?1:-1))
    // console.log('produto que teve a quantidade alterada: ')
    // console.log(produtosSelecionados[index])
  }

  const confirmarInserçãoNoPedido = () => {
    database.abrirMesa(id);

    try {
      let arrayDePedidos = pedidos.concat(produtosSelecionados);
      // console.log(arrayDePedidos)
      // console.log(JSON.stringify(arrayDePedidos));
      database.atualizarPedidos(id, JSON.stringify(arrayDePedidos));
      navigator.goBack();
    } catch (error) {
      console.log('erro ao confirmar pedidos no cardapio ', error)
    } finally {

    }

  }

  // função pra carregar o cardápio
  const recuperarProdutos = async () => {
    const db = await SQLite.openDatabaseAsync(database.databaseOnUse, {
      useNewConnection: true
    });

    try {
      const allRows = await db.getAllAsync('SELECT * FROM cardapio');
      let arrayProdutos = [];
      for (const row of allRows) {
        arrayProdutos.push(new Pedido(Math.random(), row.descricao, row.preco, 1))
      }
      setProdutos(arrayProdutos);
      setProdutosFiltrados(arrayProdutos);
      // console.log('produtos recuperados')
      // console.log(produtos)

    } catch (error) {
      console.log('deu erro tentando recuperar os produtos: ', error)
    } finally {
      db.closeAsync();
    }
  }

  // recuperar os pedidos que já estão na mesa
  const recuperarPedidos = async () => {
    database.recuperarMesaPorId(id).then((res) => {
      if (res.pedidos != null && res.pedidos != '') {
        setPedidos(JSON.parse(res.pedidos));
      }
    })
  }

  useEffect(() => {
    recuperarProdutos();
    recuperarPedidos();
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        
        <View style={styles.content}>
          <BarraPesquisar pesquisarPor={pesquisarPorProduto}/>

          <SafeAreaProvider style={{width: '100%'}}>
            <SafeAreaView style={styles.contentLista}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={produtosFiltrados}
                renderItem={({item}) => <ItemCardapio id={item.id} descricao={item.descricao} precoUni={item.preco} onSelect={adicionarProdutoSelecionado} controleQtd={atualizarQuantidade} />}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>

            <View style={styles.viewAdcionar}>
              <TouchableOpacity style={styles.btnAdicionar}
                onPress={() => {
                  // console.log(produtosSelecionados)
                  // console.log(pedidos)
                  confirmarInserçãoNoPedido();
                }}
              >
                <Text 
                  style={{
                    color: 'white',
                    fontSize: 20,
                    padding: 13,
                    fontFamily: 'Barlow-Medium',
                    textAlign: 'center',
                    textAlignVertical: 'center'
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
