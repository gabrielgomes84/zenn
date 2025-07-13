import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('taskColors.db');

export function criarTabelaCores() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cores_tarefas (
        tarefa_id TEXT PRIMARY KEY,
        cor TEXT
      );`
    );
  });
}

export function salvarCorLocal(tarefaId: string, cor: string, callback?: () => void) {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR REPLACE INTO cores_tarefas (tarefa_id, cor) VALUES (?, ?);`,
      [tarefaId, cor],
      () => callback && callback(),
      (_, error) => { 
        console.error('Erro ao salvar cor:', error); 
        return false; 
      }
    );
  });
}

export function buscarCores(callback: (coresMap: Record<string, string>) => void) {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM cores_tarefas;`,
      [],
      (_, { rows }) => {
        const coresMap: Record<string, string> = {};
        for (let i = 0; i < rows.length; i++) {
          const item = rows.item(i);
          coresMap[item.tarefa_id] = item.cor;
        }
        callback(coresMap);
      },
      (_, error) => {
        console.error('Erro ao buscar cores:', error);
        return false;
      }
    );
  });
}