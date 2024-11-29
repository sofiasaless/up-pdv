import * as SQLite from 'expo-sqlite';
import { itensDoCardapioEmLinhaDeInsercao } from './cardapio/itensCardapio';
import useConvertors from '../util/useConvertors';

export default function useDatabaseConfig() {

  // produtos do cardapio
  const produtos = itensDoCardapioEmLinhaDeInsercao;

  // util para conversão de datas
  const convertor = useConvertors();

  // variável com nome do banco de dados em uso, também coloquei ela pra exportar, vai ficar mais prático pra abrir o banco
  const databaseOnUse = 'cantinhoDB';

  // criando a tabela de mesas e uma mesa
  async function criarNovaMesa() {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    try {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS mesas 
        (
          id INTEGER PRIMARY KEY NOT NULL, 
          status TEXT NOT NULL,
          pedidos TEXT
        );
      `);
  
      console.log('tabela criada com sucesso');
  
      // agora inserindo uma nova mesa na tabela
      await db.runAsync(
        'INSERT INTO mesas (status) VALUES ("Disponivel")'
      );
  
      // pra debug
      console.log('mesa registrara com sucesso');

      tabelaCardapio();
    } catch (error) {
      console.log('erro ao criar tabela e inserir mesa ', error);
    } finally {
      // fechando bd
      db.closeAsync();
    }

  }

  async function removerMesa(id) {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    const statement = await db.prepareAsync(
      'DELETE FROM mesas WHERE id = $id'
    );
    
    try {
      let result = await statement.executeAsync(
        { $id: id }
      );
      console.log('nova deleção:', result, result.changes);  
    } catch (error) {
      console.log('erro ao deletar ', error)
    } finally {
      await statement.finalizeAsync();
      await db.closeAsync();
      console.log(id + ' - removido com sucesso');
    }
  }

  // quando encerrar a conta essa função vai ser acionada com posteriores mudanças
  async function fecharMesa(id) {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    // criando o statement
    const statement = await db.prepareAsync(
      'UPDATE mesas SET status = $status, pedidos = $pedidos WHERE id = $id'
    );

    try {
      let result = await statement.executeAsync(
        { 
          $status: 'Disponivel',
          $pedidos: '',
          $id: id,
        }
      );
      console.log('nova atualização:', result, result.changes); 
    } catch (error) {
      console.log('erro ao fechar a mesa ', error);
    } finally {
      await statement.finalizeAsync();
    }

  }

  async function abrirMesa(id) {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    // criando o statement
    const statement = await db.prepareAsync(
      'UPDATE mesas SET status = $status WHERE id = $id'
    );

    try {
      let result = await statement.executeAsync(
        { 
          $status: 'Ocupada',
          $id: id,
        }
      );
      console.log('nova atualização:', result, result.changes); 
    } catch (error) {
      console.log('erro ao fechar a mesa ', error);
    } finally {
      await statement.finalizeAsync();
    }

  }

  // atualizando pedidos de uma mesa
  async function atualizarPedidos(id, pedidos) {    
    // console.log(typeof pedidos)
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    // criando o statement
    const statement = await db.prepareAsync(
      'UPDATE mesas SET pedidos = $pedidos WHERE id = $id'
    );

    try {
      let result = await statement.executeAsync(
        { 
          $pedidos: pedidos,
          $id: id,
        }
      );

      if (pedidos === '[]') {
        await fecharMesa(id)
      }

      console.log('nova atualização:', result, result.changes); 
    } catch (error) {
      console.log('erro ao atualizar pedidos da mesa ', error);
    } finally {
      await statement.finalizeAsync();
    }

  }

  // retornando mesa específica
  async function recuperarMesaPorId (id) {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true,
    });

    let result;
    return new Promise(async function (resolve, reject) {
      result = await db.getFirstAsync(`SELECT * FROM mesas WHERE id = ${id}`);
      // console.log(result.pedidos)
      resolve(result)
      db.closeAsync();
    })
  }

  // vendo mesas para debug
  async function verMesas() {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    const allRows = await db.getAllAsync('SELECT * FROM mesas');
    for (const row of allRows) {
      console.log(row.id, row.status, row.pedidos);
    }
    
    db.closeAsync();
  }

  async function drop() {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });
    await db.execAsync(`
      DROP TABLE mesas
    `);
    console.log('tabela apagada com sucesso');
    db.closeAsync();
  }

  // cardápio
  async function tabelaCardapio() {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    try {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS cardapio 
        (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          descricao TEXT NOT NULL, 
          preco REAL NOT NULL,
          quantidade INTEGER
        );
      `);
      console.log('tabela de cardapio criada com sucesso')
  
      // verificando se os produtos já estão ou não inseridos
      const result = await db.getFirstAsync('SELECT COUNT(*) FROM cardapio');
  
      // se a quantidade de linhas for 0 significa que os produtos precisam ser inseridos 
      (result['COUNT(*)'] == 0) ? await db.runAsync( produtos) : console.log('os produtos já estão cadastrados')
    } catch (error) {
      console.log('erro ao criar tabela de cardapio ', error)
    } finally {
      db.closeAsync();
    }

  }

  async function adicionarNoCardapio(descricao, preco) {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    try {
      await db.runAsync(
        'INSERT INTO cardapio (descricao, preco, quantidade) VALUES (?, ?, ?)',
        descricao,
        preco,
        1
      );

      console.log('novo produto cadastrado com sucesso')
    } catch (error) {
      console.log('erro ao cadastrar novo produto no cardapio ' + error)
    } finally {
      db.closeAsync();
    }
  }

  async function removerProduto(id) {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    const statement = await db.prepareAsync(
      'DELETE FROM cardapio WHERE id = $id'
    );
    
    try {
      let result = await statement.executeAsync(
        { $id: id }
      );
      console.log('nova deleção no cardapio', result, result.changes);  
    } catch (error) {
      console.log('erro ao deletar ', error)
    } finally {
      await statement.finalizeAsync();
      await db.closeAsync();
      console.log(id + ' - removido com sucesso');
    }
  }

  async function verCardapio() {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    const allRows = await db.getAllAsync('SELECT * FROM cardapio');
    for (const row of allRows) {
      console.log(row.id, row.descricao, row.preco);
    }
    
    db.closeAsync();
  }

  // configurações de histórico
  async function criarHistorico(idMesa, pedidos, dataDoPedido) {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    try {
      await db.execAsync(`
        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS historicoPedidos 
        (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          idMesaOrigem INTEGER REFERENCES mesas (id) NOT NULL,          
          pedidos TEXT NOT NULL,
          dataDoPedido TEXT NOT NULL
        );
      `);
  
      console.log('tabela de historico criada com sucesso');
  
      // agora inserindo uma nova mesa na tabela
      await db.runAsync(
        `INSERT INTO historicoPedidos (pedidos, idMesaOrigem, dataDoPedido) VALUES ('${pedidos}', ${idMesa}, '${dataDoPedido}')`
      );
  
    } catch (error) {
      console.log('erro ao inserir no histórico ', error);
    } finally {
      // fechando bd
      db.closeAsync();
    }
  }

  async function verHistorico() {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });

    const allRows = await db.getAllAsync('SELECT * FROM historicoPedidos');
    for (const row of allRows) {
      console.log(row.id, row.pedidos, row.dataDoPedido, row.idMesaOrigem);
    }
    
    db.closeAsync();
  }

  async function recuperarHistoricoDoDia () {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true,
    });

    return new Promise(async function (resolve, reject) {
      let arrayPedidosDoDia = []
      const allRows = await db.getAllAsync(`SELECT * FROM historicoPedidos WHERE dataDoPedido = "${new Date().toLocaleDateString()}"`);
      
      for(const row of allRows) {
        // console.log(row.id, row.pedidos)
        arrayPedidosDoDia = arrayPedidosDoDia.concat(JSON.parse(row.pedidos));
      }

      // console.log('conteudo do dia')
      // console.log(arrayPedidosDoDia)

      // resolve(allRows)
      resolve(arrayPedidosDoDia)
      db.closeAsync();
    })
  }

  async function recuperarHistoricoDoPeriodo(dataInicio, dataFim) {
    const db = await SQLite.openDatabaseAsync(databaseOnUse, {
      useNewConnection: true
    });
    
    let pedidosArray = []
    if (dataFim < dataInicio) {
      return [];
    }

    return new Promise(async function (resolve, reject) {
      try {
        const allRows = await db.getAllAsync(`SELECT * FROM historicoPedidos`);

        // filtrando as datas 
        for (const row of allRows) {
          let dataConvertida = convertor.dateStringToDateObj(row.dataDoPedido);

          // se for igual a data de inicio ou data de fim, entao vai mostrar
          if (
            (dataConvertida.getTime() == dataInicio.getTime()) 
            ||
            (dataConvertida.getTime() == dataFim.getTime())
          ) {
            pedidosArray = pedidosArray.concat(JSON.parse(row.pedidos))
          } 
          // ou se for maior que a dataInicio e menor que a dataFim
          else if ((dataConvertida > dataInicio) && (dataConvertida < dataFim)) { 
            pedidosArray = pedidosArray.concat(JSON.parse(row.pedidos))
          }
        }

        // console.log('pedidos filtrados ')
        // console.log(pedidosArray)
        resolve(pedidosArray);
      } catch (error) {
        console.log('erro ao tentar buscar pedidos filtrados do historico')
        resolve([])
      } finally {
        db.closeAsync()
      }
    })
    
  }

  return { 
    databaseOnUse,
    criarNovaMesa,
    removerMesa,
    verMesas,
    drop,
    fecharMesa,
    abrirMesa,
    atualizarPedidos,
    recuperarMesaPorId,
    verCardapio,
    verHistorico,
    criarHistorico,
    recuperarHistoricoDoDia,
    adicionarNoCardapio,
    removerProduto,
    recuperarHistoricoDoPeriodo
  }

}