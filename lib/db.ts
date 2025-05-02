import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Initialize SQLite Database
const dbPromise = open({
  filename: './data/analytics.sqlite', 
  driver: sqlite3.Database
});

// Create the table if it doesn't exist yet
export const createTables = async () => {
  const db = await dbPromise;
  await db.run(`
    CREATE TABLE IF NOT EXISTS generation_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      topic TEXT,
      type TEXT,
      status TEXT,
      video_url TEXT,
      download_count INTEGER DEFAULT 0
    )
  `);
};

// Log a new generation request
export const logJob = async (topic: string, type: string, status: string, videoUrl: string) => {
  const db = await dbPromise;
  await db.run(
    `INSERT INTO generation_jobs (topic, type, status, video_url) VALUES (?, ?, ?, ?)`,
    [topic, type, status, videoUrl]
  );
};

// Get analytics
export const getAnalytics = async () => {
  const db = await dbPromise;
  const rows = await db.all(`SELECT * FROM generation_jobs ORDER BY timestamp DESC`);
  return rows;
};
