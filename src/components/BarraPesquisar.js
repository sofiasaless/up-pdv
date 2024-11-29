import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

// componente de barra de pesquisa para usar na visualização de produtos
export default function BarraPesquisar( { pesquisarPor } ) {
  const [pesquisa, setPesquisa] = useState('');

  const pesquisarPorProduto = (text) => {
    setPesquisa(text);
    if (pesquisarPor) {
      pesquisarPor(text);
    }
  };

  return (
    <View style={styles.boxInputAndIcon}>
      <TextInput
        style={styles.input}
        placeholder={"Procurar produto..."}
        placeholderTextColor={'#d9d9d9'}
        cursorColor={'white'}
        value={pesquisa}
        onChangeText={pesquisarPorProduto}
      />
      <AntDesign name="search1" size={20} color="white" style={styles.imageIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  boxInputAndIcon: {
    backgroundColor: '#1d3461',
    marginVertical: 15,
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  },
  input: {
    width: '90%',
    color: 'white',
    fontFamily: 'Barlow-Medium'
  }
});