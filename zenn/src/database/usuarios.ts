import { User } from '../models/user';
import { db } from './database';

export async function criarTabelaUsuarios() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      data_criacao TEXT NOT NULL
    );
  `);
}

export async function inserirUsuario(usuario: User): Promise<void> {
  await db.runAsync(
    `INSERT INTO usuarios (id, nome, email, senha, data_criacao)
     VALUES (?, ?, ?, ?, ?);`,
    [usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.data_criacao]
  );
}

export async function buscarUsuarioPorEmailSenha(email: string, senha: string): Promise<User | null> {
  const result = await db.getFirstAsync(
    `SELECT * FROM usuarios WHERE email = ? AND senha = ? LIMIT 1;`,
    [email, senha]
  );
  return result ? (result as User) : null;
}

export async function buscarUsuarioPorId(id: string): Promise<User | null> {
  const result = await db.getFirstAsync(
    `SELECT * FROM usuarios WHERE id = ? LIMIT 1;`,
    [id]
  );
  return result ? (result as User) : null;
}

export async function atualizarUsuario(usuario: User): Promise<void> {
  await db.runAsync(
    `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?;`,
    [usuario.nome, usuario.email, usuario.senha, usuario.id]
  );
}
