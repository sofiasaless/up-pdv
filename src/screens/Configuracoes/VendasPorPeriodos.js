import { StatusBar } from 'expo-status-bar';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DATA } from '../data';
import * as SQLite from 'expo-sqlite';

// componentes
import RodapeUp from '../../components/RodapeUp';
import ItemHistorico from '../../components/ItemHistorico';
import DatePickerExample from '../../components/DatePickerExample';

// outros imports
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from 'react';
import useConvertors from '../../util/useConvertors';
import useDatabaseConfig from '../../database/useDatabaseConfig';
import { Pedido } from '../../model/Pedido';

export default function VendasPorPeriodos() {
  const data = DATA;

  // instâncias
  const database = useDatabaseConfig();
  const convertor = useConvertors();

  // controle das datas
  const [dataDeInicio, setDataDeInicio] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [dataDeFim, setDataDeFim] = useState(new Date())
  const setingInicio = (d) => {
    setDataDeInicio(convertor.dateStringToDateObj(d))
  }
  const setingFim = (d) => {
    setDataDeFim(convertor.dateStringToDateObj(d));
  }

  // states de controle dos pedidos
  const [pedidos, setPedidos] = useState([])

  // recuperando de acordo com as datas selecionadas
  const recuperarPedidosPorDatas = async () => {
    const db = await SQLite.openDatabaseAsync(database.databaseOnUse, {
      useNewConnection: true
    });
    try {
      let arrayPedidos = []
      const allRows = await db.getAllAsync(`SELECT * FROM historicoPedidos`);
      for (const row of allRows) {
        // validação necessária para pegar apenas os itens de faturamento do mês atual
        // só colocar um if else comparando as dates pelo mês
        // vai pegar só os itens do mês e ano atual
        if (
          (convertor.dateStringToDateObj(row.dataDoPedido).getMonth() === new Date().getMonth())
          &&
          (convertor.dateStringToDateObj(row.dataDoPedido).getFullYear() === new Date().getFullYear())
        ) {
          arrayPedidos = arrayPedidos.concat(JSON.parse(row.pedidos))
        }
      }

      // console.log('pedidos do mes')
      // console.log(arrayPedidos)
      setPedidos(arrayPedidos);
      // console.log(pedidos)
      
    } catch (error) {
      console.log('erro ao tentar buscar dados de historico', error)
    } finally {
      db.closeAsync()
    }
  }

  useEffect(() => {
    recuperarPedidosPorDatas();
  },[])

  var total = 0

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>

        <View style={styles.content}>
          <View style={styles.filtroDeData}>
            <View style={styles.viewInterna}>
              <Text style={styles.txtIntro}>Veja suas vendas antigas!</Text>
            </View>

            <View style={styles.viewInterna}>
              <TouchableOpacity style={styles.btnData}>
                {/* <Text style={styles.txtData}>01/11/2024</Text> */}
                <DatePickerExample
                  title={dataDeInicio.toLocaleDateString()}
                  setingDate={setingInicio}
                  fontSize={15}
                />
              </TouchableOpacity>

              <Text 
                style={{
                  textAlign: 'center', 
                  textAlignVertical: 'center',
                  color: 'white',
                  fontSize: 17
                }}
              >
                até
              </Text>

              <TouchableOpacity style={styles.btnData}>
                {/* <Text style={styles.txtData}>26/11/2024</Text> */}
                <DatePickerExample
                  title={dataDeFim.toLocaleDateString()}
                  setingDate={setingFim}
                  fontSize={15}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnData}
                onPress={async () => {
                  database.recuperarHistoricoDoPeriodo(dataDeInicio, dataDeFim).then((res) => {
                    setPedidos(res);
                  });
                }}
              >
                <Text style={styles.txtData}>Filtrar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnResetar}
                onPress={() => {
                  setDataDeFim(new Date())
                  setDataDeInicio(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
                  recuperarPedidosPorDatas();
                }}
              >
                <Text style={styles.txtResetar}>Resetar</Text>
              </TouchableOpacity>
            </View>

          </View>
          
          
          <View style={styles.listaDePedidos}>
            <View style={{height: '80%'}}>
              <FlatList
                style={styles.lista}
                data={pedidos}
                renderItem={({item}) => <ItemHistorico descricao={item.descricao} quantidade={item.quantidade} precoUni={item.preco} />}
                keyExtractor={item => Math.random()}
              />
            </View>

            <View style={styles.viewTotal}>
              <Text 
                style={{flex: 1, fontSize: 24, fontWeight: 'bold'}}
              >Total</Text>
              <Text 
                style={{fontSize: 24, fontWeight: 'bold'}} 
              >
                {
                  (pedidos == null)?
                  ''
                  :
                  pedidos.map((p) => {
                    total += p.total;
                  })
                }
                R$ {total.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity style={styles.btnCompartilhar}>
              <Text style={styles.txtCompartilhar}>Compartilhar</Text>
              <Entypo name="share-alternative" size={20} color="black" />
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
    alignItems: 'center',
  },
  filtroDeData: {
    height: '20%',
    // backgroundColor: 'red',
    width: '95%',
    justifyContent: 'space-evenly'
  },
  txtIntro: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  viewInterna: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7
  },
  btnData: {
    backgroundColor: '#3b5486',
    borderRadius: 5
  },
  txtData: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    padding: 5,
  },
  btnResetar: {
    backgroundColor: 'white',
    borderRadius: 5
  },
  txtResetar: {
    textAlign: 'center',
    fontSize: 15,
    padding: 5,
  },



  listaDePedidos: {
    height: '80%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 10
  },
  viewTotal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 5,
    backgroundColor: '#fec601',
    borderRadius: 5,
    alignSelf: 'center'
  },
  btnCompartilhar: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '50%',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtCompartilhar: {
    width: '80%',
    fontSize: 17,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold'
  }
});
