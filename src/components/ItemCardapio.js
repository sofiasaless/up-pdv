import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pedido } from '../model/Pedido';

export default function ItemCardapio( {id, descricao, precoUni, onSelect, controleQtd} ) {
  const [quantidade, setQuantidade] = useState(1)

  const maisQuantidade = () => {
    setQuantidade(quantidade + 1);
    atualizarQtd(true)
  }
  const menosQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
      atualizarQtd(false)
    }
  }

  // state pra controlar se o item ta selecionado ou nao
  const [selecionado, setSelecionado] = useState(true)
  const produtosSelecionados = (pro) => {
    onSelect(selecionado, pro);
  }

  const atualizarQtd = (action) => {
    controleQtd(id, quantidade, action)
  }

  return (
    <View style={styles.itemCardapio}>
      <TouchableOpacity style={[styles.infoItem, {backgroundColor: (selecionado)?'#247ba0':'#3b5486'}]}
        onPress={() => {
          setSelecionado(!(selecionado))
          produtosSelecionados(new Pedido(id, descricao, precoUni, quantidade));
        }}
      >
        <Text style={styles.txtDescricao}>{descricao}</Text>
        <Text style={styles.txtPreco}>R$ {precoUni}</Text>
      </TouchableOpacity>

      <View style={styles.qtdControle}>
        <TouchableOpacity style={styles.plus} onPress={menosQuantidade} disabled={selecionado}>
          <Text style={styles.txtPlus}>-</Text>
        </TouchableOpacity>

        <View style={styles.viewQntd}>
          <Text style={styles.txtPlus}>{quantidade}</Text>
        </View>

        <TouchableOpacity style={styles.plus} onPress={maisQuantidade} disabled={selecionado}>
          <Text style={styles.txtPlus}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemCardapio: {
    backgroundColor: '#247ba0',
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  infoItem: {
    // backgroundColor: '#247ba0',
    borderRadius: 3,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    width: '70%'
  },
  txtDescricao: {
    color: 'white',
    fontSize: 18,
    // backgroundColor: 'green'
  },
  txtPreco: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
    // backgroundColor: 'red'
  },
  qtdControle: {
    // backgroundColor: '#247ba0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: '30%',
    gap: 6
  },
  plus: {
    backgroundColor: '#1d3461',
    padding: 8,
    borderRadius: 20,
    flex: 1
  },
  txtPlus: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
  viewQntd: {
    backgroundColor: '#1d3461',
    padding: 10,
    borderRadius: 10
  }
});
