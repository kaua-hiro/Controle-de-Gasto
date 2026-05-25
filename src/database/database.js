import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native'; // Módulo para identificar onde o app está rodando

// Variáveis globais para o funcionamento Web
let db = null;
let mockDatabase = [];
let mockId = 1;

if (Platform.OS !== 'web') {
  db = SQLite.openDatabaseSync('gastos.db');
}

export const initDB = () => {
  if (Platform.OS === 'web') return;

  db.execSync(`
    CREATE TABLE IF NOT EXISTS gastos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      categoria TEXT NOT NULL,
      valor REAL NOT NULL,
      data TEXT NOT NULL
    );
  `);
};

export const insertGasto = (descricao, categoria, valor, data) => {
  if (Platform.OS === 'web') {
    mockDatabase.push({ id: mockId++, descricao, categoria, valor, data });
    return;
  }

  db.runSync(
    `INSERT INTO gastos (descricao, categoria, valor, data) VALUES (?, ?, ?, ?)`,
    [descricao, categoria, valor, data]
  );
};

export const getGastos = () => {
  if (Platform.OS === 'web') {
    return [...mockDatabase].reverse();
  }

  return db.getAllSync(`SELECT * FROM gastos ORDER BY id DESC`);
};