import { Task } from "../models/task";
import { db } from "./database";

export async function createTarefasTable() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
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
    );
  `);
}

export async function insertTarefa(tarefa: Task) {
  await db.runAsync(
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
}

export async function getTarefasByDate(usuarioId: string, data: string): Promise<Task[]> {
  const result = await db.getAllAsync(
    `SELECT * FROM tarefas WHERE usuario_id = ? AND data = ?;`,
    [usuarioId, data]
  );

  return result.map((row: any) => ({
    ...row,
    lembrete: row.lembrete === 1,
  })) as Task[];
}

export async function deleteTarefa(id: string) {
  await db.runAsync(`DELETE FROM tarefas WHERE id = ?;`, [id]);
}

export async function updateTarefa(tarefa: Task) {
  await db.runAsync(
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
}
