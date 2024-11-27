import { StatusBar } from 'expo-status-bar';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DATA } from '../data';

// componentes
import RodapeUp from '../../components/RodapeUp';
import ItemHistorico from '../../components/ItemHistorico';

// outros imports
import Entypo from '@expo/vector-icons/Entypo';

export default function VendasPorPeriodos() {
  const data = DATA;

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
                <Text style={styles.txtData}>01/11/2024</Text>
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
                <Text style={styles.txtData}>26/11/2024</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnData}>
                <Text style={styles.txtData}>Filtrar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnResetar}>
                <Text style={styles.txtResetar}>Resetar</Text>
              </TouchableOpacity>
            </View>

          </View>
          
          
          <View style={styles.listaDePedidos}>
            <View style={{height: '80%'}}>
              <FlatList
                style={styles.lista}
                data={data}
                renderItem={({item}) => <ItemHistorico descricao={item.descricao} quantidade={item.quantidade} precoUni={item.precoUni} />}
                keyExtractor={item => Math.random()}
              />
            </View>

            <View style={styles.viewTotal}>
              <Text 
                style={{flex: 1, fontSize: 24, fontWeight: 'bold'}}
              >Total</Text>
              <Text 
                style={{fontSize: 24, fontWeight: 'bold'}} 
              >R$ 55,90</Text>
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
