const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..')));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/inquiries',  require('./routes/inquiries'));
app.use('/api/placements', require('./routes/placements'));
app.use('/api/admissions', require('./routes/admissions'));
app.use('/api/content',    require('./routes/content'));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Serve index.html for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 BMSCE Backend running at http://localhost:${PORT}`);
  console.log(`📡 API base: http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend: http://localhost:${PORT}/index.html\n`);
});
