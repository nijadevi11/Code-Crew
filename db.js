// Uses Node.js built-in SQLite (Node 22.5+ / Node 24) — no native compilation needed
const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, 'bmsce.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    phone       TEXT,
    program     TEXT,
    message     TEXT,
    source_page TEXT,
    created_at  TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS announcements (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    text       TEXT NOT NULL,
    active     INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    batch      TEXT,
    company    TEXT,
    avatar     TEXT,
    quote      TEXT NOT NULL,
    active     INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS placement_stats (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    year            TEXT NOT NULL UNIQUE,
    students_placed INTEGER,
    highest_package TEXT,
    avg_package     TEXT,
    placement_rate  TEXT,
    companies_count INTEGER
  );

  CREATE TABLE IF NOT EXISTS placement_branch (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    year            TEXT NOT NULL,
    branch          TEXT NOT NULL,
    eligible        INTEGER,
    placed          INTEGER,
    placement_pct   TEXT,
    avg_package     TEXT,
    highest_package TEXT,
    status          TEXT
  );

  CREATE TABLE IF NOT EXISTS recruiters (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT NOT NULL,
    emoji   TEXT,
    package TEXT,
    active  INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS fees (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    program  TEXT NOT NULL,
    amount   TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS deadlines (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    date  TEXT NOT NULL,
    year  TEXT NOT NULL
  );
`);

module.exports = db;
