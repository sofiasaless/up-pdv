import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import useDatabaseConfig from '../database/useDatabaseConfig';
import { useState } from 'react';

export default function CardMesaTransferencia( { status, id, pedidosTransferidos, mesaOrigem } ) {
  // para fazer navegações
  const navigator = useNavigation();

  const db = useDatabaseConfig();

  const atualizarMesaOrigem = async () => {
    let arrayPedidosOrigem = []
    await db.recuperarMesaPorId(mesaOrigem).then((r) => {
      arrayPedidosOrigem = JSON.parse(r.pedidos)
    })

    const resultado = arrayPedidosOrigem.filter(
      itemOrigem => !pedidosTransferidos.some(
        itemTransferido => itemTransferido.id === itemOrigem.id
      )
    );

    // console.log('itens que restaram na mesa de origem')
    // console.log(resultado)
    await db.atualizarPedidos(mesaOrigem, JSON.stringify(resultado))

  }

  const receberTransferencia = async () => {
    db.abrirMesa(id);

    try {
      let newArr = []
      await db.recuperarMesaPorId(id).then((r) => {
        if (r.pedidos != null && r.pedidos != '') {
          newArr = pedidosTransferidos.concat(JSON.parse(r.pedidos));
        } else {
          newArr = pedidosTransferidos;
        }
      })

      await db.atualizarPedidos(id, JSON.stringify(newArr));

      // console.log('pedidos transferidos')
      // console.log(pedidosTransferidos)
      // console.log('mesa de origem:')
      // console.log(mesaOrigem)
      
      // apagando os itens transferidos da mesa de origem
      await atualizarMesaOrigem();

    } catch (error) {
      console.log('erro ao receber transferência ', error);
    }

  }
  
  return (
    <TouchableOpacity 
      style={
        [styles.container, 
          {
            backgroundColor: (status === 'Ocupada') ? '#3bb273':'#d3d3d3'
          }
        ]
      }
      onPress={() => {
        receberTransferencia();
        navigator.navigate('Home');
      }}
    >
      <Text style={styles.txtMesa}>MESA {id}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a6a6a6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14 ,
    height: 130,
    marginBottom: 20,
    width: '47%'
  },
  txtMesa: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold'
  }
});
