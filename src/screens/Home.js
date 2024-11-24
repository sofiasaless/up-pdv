import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RodapeUp from '../components/RodapeUp';
import CardMesa from '../components/CardMesa';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.containerIntroducao}>
        <View style={styles.containerTextoOpcao}>
          <View>
            <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>Up! PDV</Text>
            <Text style={{color: 'white', fontSize: 17}}>Bem-vindo ao seu sistema de vendas!</Text>
          </View>
          <View>
            <Text style={{color: 'white'}}>***</Text>
          </View>
        </View>

        <View style={styles.containerNovaMesa}>
          <TouchableOpacity style={styles.btnNovaMesa}>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>Nova mesa</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <View style={styles.content}>
        <View style={styles.contentIntro}>
          <Text style={styles.txtMesa}>Mesas</Text>
        </View>

        <ScrollView style={styles.contentMesas}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mesasContainer}>
            <CardMesa status={'Ocupada'}/>
            <CardMesa />
            <CardMesa status={'Ocupada'}/>
            <CardMesa status={'Ocupada'}/>
            <CardMesa />
            <CardMesa />
            <CardMesa status={'Ocupada'}/>
            <CardMesa />
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
    justifyContent: 'flex-start',
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
    borderRadius: 15
  },
  content: {
    backgroundColor: '#fff',
    width: '100%',
    height: '70%',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center'
  },
  contentIntro: {
    width: '90%',
    // backgroundColor: 'green',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  txtMesa: {
    fontSize: 50,
    textAlign: 'center'
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
