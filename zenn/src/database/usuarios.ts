// src/database/usuarios.ts
import { User } from '../models/user';
import { db } from './database';
import { openDatabase, SQLResultSet } from 'expo-sqlite';

export const criarTabelaUsuarios = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id TEXT PRIMARY KEY NOT NULL,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        data_criacao TEXT NOT NULL
      );`
    );
  });
};

export const inserirUsuario = (usuario: User): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO usuarios (id, nome, email, senha, data_criacao)
         VALUES (?, ?, ?, ?, ?);`,
        [usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.data_criacao],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const buscarUsuarioPorEmailSenha = (email: string, senha: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM usuarios WHERE email = ? AND senha = ? LIMIT 1;`,
        [email, senha],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const buscarUsuarioPorId = (id: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM usuarios WHERE id = ? LIMIT 1;`,
        [id],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const atualizarUsuario = (usuario: User): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?;`,
        [usuario.nome, usuario.email, usuario.senha, usuario.id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};
