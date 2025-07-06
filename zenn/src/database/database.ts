// src/database/database.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app.db');

export default db;