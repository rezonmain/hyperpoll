CREATE TABLE IF NOT EXISTS poll (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pollId TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME,
  title TEXT NOT NULL
  active INTEGER NOT NULL DEFAULT 1
);
PRAGMA user_version = 1;