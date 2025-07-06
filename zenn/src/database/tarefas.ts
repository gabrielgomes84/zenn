import { Task } from "../models/task";
import { db } from "./database";

export function createTarefasTable() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tarefas (
        id TEXT PRIMARY KEY NOT NULL,
        usuario_id TEXT,
        titulo TEXT,
        descricao TEXT,
        data TEXT,
        hora TEXT,
        prioridade TEXT,
        status TEXT,
        lembrete INTEGER,
        data_criacao TEXT
      );`
    );
  });
}

export function insertTarefa(tarefa: Task) {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO tarefas (id, usuario_id, titulo, descricao, data, hora, prioridade, status, lembrete, data_criacao)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        tarefa.id,
        tarefa.usuario_id,
        tarefa.titulo,
        tarefa.descricao,
        tarefa.data,
        tarefa.hora,
        tarefa.prioridade,
        tarefa.status,
        tarefa.lembrete ? 1 : 0,
        tarefa.data_criacao,
      ]
    );
  });
}

export function getTarefasByDate(usuarioId: string, data: string, callback: (tarefas: Task[]) => void) {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM tarefas WHERE usuario_id = ? AND data = ?;`,
      [usuarioId, data],
      (_, result) => {
        const tarefas = result.rows._array.map((row: any) => ({
          ...row,
          lembrete: row.lembrete === 1,
        })) as Task[];
        callback(tarefas);
      }
    );
  });
}

export function deleteTarefa(id: string) {
  db.transaction(tx => {
    tx.executeSql(`DELETE FROM tarefas WHERE id = ?;`, [id]);
  });
}

export function updateTarefa(tarefa: Task) {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE tarefas SET
        titulo = ?,
        descricao = ?,
        data = ?,
        hora = ?,
        prioridade = ?,
        status = ?,
        lembrete = ?,
        data_criacao = ?
      WHERE id = ?;`,
      [
        tarefa.titulo,
        tarefa.descricao,
        tarefa.data,
        tarefa.hora,
        tarefa.prioridade,
        tarefa.status,
        tarefa.lembrete ? 1 : 0,
        tarefa.data_criacao,
        tarefa.id,
      ]
    );
  });
}
