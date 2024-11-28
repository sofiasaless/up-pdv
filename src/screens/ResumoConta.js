import { StatusBar } from 'expo-status-bar';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

// componentes
import RodapeUp from '../components/RodapeUp';
import ItemPedido from '../components/ItemPedido';

// imports além
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import useDatabaseConfig from '../database/useDatabaseConfig';
import { Pedido } from '../model/Pedido';

export default function ResumoConta( { route } ) {
  // instâncias
  const navigator = useNavigation();
  const db = useDatabaseConfig();

  // parametros da rota
  const id = route.params.idMesa;

  // states para controle da mesa
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [pedidos, setPedidos] = useState([])

  const adicionarNoPedidoForaCardapio = () => {
    // tem que abrir a mesa primeiro
    db.abrirMesa(id);

    let arrayPedidos = []
    arrayPedidos = pedidos
    arrayPedidos.push(new Pedido(Math.random(), descricao, Number(preco), (Number(quantidade) === 0)? 1:Number(quantidade)))
    setPedidos(arrayPedidos);

    // salvando os pedidos da mesa no bando de dados
    try {
      db.atualizarPedidos(id, JSON.stringify(pedidos));
    } catch (error) {
      console.log('erro ao atualizar mesa: ', error);
    } finally {
      recuperarDadosDaMesa();
    }
  }

  // selecionando itens do pedido para manipulação
  const [itensSelecionados, setItensSelecionados] = useState([])
  
  // apagando itens do pedido
  const selecionadosPorCheck = (id, action) => {
    if (!action) {
      let arraySelecionados = itensSelecionados;
      arraySelecionados.push(id);
      setItensSelecionados(arraySelecionados);
    } else { // se for true tem que tirar o id da lista pq ele não tá mais selecionado
      let index = itensSelecionados.find(e => e === id);
      itensSelecionados.splice(index, 1);
    }

    // console.log('itens que foram selecionados')
    // console.log(itensSelecionados)
  }

  const excluirItensDoPedido = () => {
    // colocar um alert caso ele nao tenha selecionado nenhum item

    // percorrendo os pedidos e tirando
    let arrayPedidos = pedidos
    pedidos.forEach((p, indice) => {
      itensSelecionados.forEach((i) => {
        if (p.id === i) {
          arrayPedidos.splice(indice, 1);
        }
      })
    })

    // atualizando a mesa no banco de dados
    try {
      db.atualizarPedidos(id, JSON.stringify(arrayPedidos));
    } catch (error) {
      console.log('erro ao atualizar mesa com itens deletados ', error);
    } finally {
      recuperarDadosDaMesa();
    }
  }

  const recuperarDadosDaMesa = async () => {
    db.recuperarMesaPorId(id).then((res) => {
      if (res.pedidos != null && res.pedidos != '') {
        setPedidos(JSON.parse(res.pedidos));
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
      recuperarDadosDaMesa();
    },[])
  );

  // controle do total
  var total = 0

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.containerIntroducao}>
          <View style={styles.containerTxtMesa}>
            <View>
              <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>MESA {id}</Text>
            </View>
          </View>

          <View style={styles.containerTotal}>
            <Text 
              style={{flex: 1, fontSize: 24, fontWeight: 'bold'}}
            >Total</Text>
            <Text 
              style={{fontSize: 24, fontWeight: 'bold'}} 
            > 
              {
                (pedidos === null)?
                ''
                :
                pedidos.map((p) => {
                  total += p.total;
                })
              }
              R$ {total.toFixed(2)}
            </Text>
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
              onChangeText={setDescricao}
            />
            <View style={styles.formViewInterna}>
              <TextInput
                style={styles.inputInterno} 
                placeholder='Preço'
                placeholderTextColor={'#d9d9d9'}
                cursorColor={'white'}
                keyboardType='numeric'
                onChangeText={setPreco}
              />
              <TextInput
                style={styles.inputInterno} 
                placeholder='Quantidade'
                placeholderTextColor={'#d9d9d9'}
                cursorColor={'white'}
                keyboardType='numeric'
                onChangeText={setQuantidade}
                value={quantidade}
              />
              <TouchableOpacity
                style={styles.btnAdicionar}
                onPress={adicionarNoPedidoForaCardapio}
              >
                <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>Cardápio</Text>
            <TouchableOpacity
              style={styles.btnSelecionarProduto}
              onPress={() => {
                navigator.navigate('ExibirCardapio', {
                  idMesa: id
                })
              }}
            >
              <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: 'white'}}>+   Selecionar produto</Text>
            </TouchableOpacity>

            {/* lista de pedidos da mesa, essa view precisa ter uma altura precisa, ou na vdd vai ser uma flatlist */}
            <SafeAreaProvider>
              <SafeAreaView>
                <FlatList
                  style={styles.containerPedidos}
                  data={pedidos}
                  renderItem={({item}) => 
                    <ItemPedido id={item.id} quantidade={item.quantidade} descricao={item.descricao} precoUni={item.preco} total={item.total} onCheck={selecionadosPorCheck} />
                  }
                  keyExtractor={item => Math.random()}
                />
              </SafeAreaView>

              <View style={styles.btnDeConta}>
                <TouchableOpacity style={[styles.btnEncerrar, {backgroundColor: '#1d3461'}]}
                  onPress={async () => {
                    await db.fecharMesa(id).then(() => {
                      Alert.alert('Encerramento', 'Conta da mesa encerrada com sucesso!');
                      navigator.goBack();
                    });
                  }}
                >
                  <FontAwesome5 style={[styles.iconBtn]} name="money-bill-alt" size={20} color="white" />
                  <Text style={[styles.txtBtn, {marginLeft: 15}]}>Encerrar conta</Text>
                </TouchableOpacity>

                <View style={styles.btnView}>
                  <TouchableOpacity style={[styles.btnMenor, {backgroundColor: '#3bb273'}]}
                    onPress={() => {

                    }}
                  >
                    <MaterialIcons style={styles.iconBtn} name="move-down" size={20} color="white" />
                    <Text style={styles.txtBtn}>Transferir</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.btnMenor, {backgroundColor: '#e15554'}]}
                    onPress={excluirItensDoPedido}
                  >
                    <Ionicons style={styles.iconBtn} name="trash-outline" size={20} color="white" />
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
  iconBtn: {
    // backgroundColor: 'orange',
  },
  txtBtn: {
    color: 'white',
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
    flexDirection: 'row',
    width: '90%',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center'
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
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
