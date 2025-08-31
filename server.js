const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

const app = express();
const env = process.env.NODE_ENV || 'development';
const PORT = config[env].port;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao banco SQLite
const db = new sqlite3.Database(config[env].dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log(`Conectado ao banco SQLite: ${config[env].dbPath}`);
    createTables();
  }
});

// Criar tabelas
function createTables() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS convidados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      parceiro TEXT,
      confirmado BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message);
    } else {
      console.log('Tabela convidados criada/verificada');
    }
  });
}

// Rotas da API

// GET - Listar todos os convidados
app.get('/api/convidados', (req, res) => {
  const sql = 'SELECT * FROM convidados ORDER BY nome';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST - Adicionar novo convidado
app.post('/api/convidados', (req, res) => {
  const { nome, parceiro } = req.body;
  
  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }
  
  const sql = 'INSERT INTO convidados (nome, parceiro) VALUES (?, ?)';
  const params = [nome, parceiro || null];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({
      id: this.lastID,
      nome,
      parceiro,
      confirmado: false,
      message: 'Convidado adicionado com sucesso!'
    });
  });
});

// PUT - Atualizar status de confirmação
app.put('/api/convidados/:id/confirmar', (req, res) => {
  const { id } = req.params;
  const { confirmado } = req.body;
  
  const sql = 'UPDATE convidados SET confirmado = ? WHERE id = ?';
  
  db.run(sql, [confirmado ? 1 : 0, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Convidado não encontrado' });
    }
    
    res.json({ 
      message: 'Status atualizado com sucesso!',
      confirmado: confirmado ? 1 : 0
    });
  });
});

// PUT - Atualizar convidado
app.put('/api/convidados/:id', (req, res) => {
  const { id } = req.params;
  const { nome, parceiro } = req.body;
  
  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }
  
  const sql = 'UPDATE convidados SET nome = ?, parceiro = ? WHERE id = ?';
  
  db.run(sql, [nome, parceiro || null, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Convidado não encontrado' });
    }
    
    res.json({ message: 'Convidado atualizado com sucesso!' });
  });
});

// DELETE - Remover convidado
app.delete('/api/convidados/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM convidados WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Convidado não encontrado' });
    }
    
    res.json({ message: 'Convidado removido com sucesso!' });
  });
});

// GET - Estatísticas
app.get('/api/stats', (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) + SUM(CASE WHEN parceiro IS NOT NULL THEN 1 ELSE 0 END) as total,
      SUM(CASE WHEN confirmado = 1 THEN 1 ELSE 0 END) + SUM(CASE WHEN confirmado = 1 AND parceiro IS NOT NULL THEN 1 ELSE 0 END) as confirmados,
      SUM(CASE WHEN confirmado = 0 THEN 1 ELSE 0 END) + SUM(CASE WHEN confirmado = 0 AND parceiro IS NOT NULL THEN 1 ELSE 0 END) as nao_confirmados,
      SUM(CASE WHEN parceiro IS NOT NULL THEN 1 ELSE 0 END) as casais
    FROM convidados
  `;
  
  db.get(sql, [], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Servir arquivos estáticos do React em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em: http://localhost:${PORT}/api`);
});
