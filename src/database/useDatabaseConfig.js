import * as SQLite from 'expo-sqlite';
import { Mesa } from '../model/Mesa';

export default function useDatabaseConfig() {

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
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
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
    } catch (error) {
      console.log('erro ao criar tabela e inserir mesa ', error);
    } finally {
      // fechando bd
      db.closeAsync();
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
    // console.log(id, pedidos)
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

  return { 
    databaseOnUse,
    criarNovaMesa,
    verMesas,
    drop,
    fecharMesa,
    abrirMesa,
    atualizarPedidos,
    recuperarMesaPorId
  }

}