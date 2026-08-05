require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TaskManager API', version: '1.0.0' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ TaskManager API rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Falha ao iniciar banco:', err);
    process.exit(1);
  });
