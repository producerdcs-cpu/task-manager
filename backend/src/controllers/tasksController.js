const { run, get, all } = require('../config/database');

async function list(req, res) {
  try {
    const { status, priority } = req.query;
    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [req.user.id];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (priority) {
      sql += ' AND priority = ?';
      params.push(priority);
    }

    sql += ' ORDER BY CASE priority WHEN "high" THEN 1 WHEN "medium" THEN 2 ELSE 3 END, created_at DESC';

    const tasks = await all(sql, params);
    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar tarefas' });
  }
}

async function create(req, res) {
  try {
    const { title, description, status = 'pending', priority = 'medium' } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }

    const result = await run(
      `INSERT INTO tasks (user_id, title, description, status, priority)
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, title.trim(), description || '', status, priority]
    );

    const task = await get('SELECT * FROM tasks WHERE id = ?', [result.id]);
    res.status(201).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const existing = await get('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, req.user.id]);
    if (!existing) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    const title = req.body.title !== undefined ? req.body.title : existing.title;
    const description = req.body.description !== undefined ? req.body.description : existing.description;
    const status = req.body.status !== undefined ? req.body.status : existing.status;
    const priority = req.body.priority !== undefined ? req.body.priority : existing.priority;

    await run(
      `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ?`,
      [title, description, status, priority, id, req.user.id]
    );

    const task = await get('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const existing = await get('SELECT id FROM tasks WHERE id = ? AND user_id = ?', [id, req.user.id]);
    if (!existing) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, req.user.id]);
    res.json({ message: 'Tarefa removida' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover tarefa' });
  }
}

module.exports = { list, create, update, remove };
