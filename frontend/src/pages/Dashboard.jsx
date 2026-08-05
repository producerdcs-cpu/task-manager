import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;
      const { data } = await api.get('/tasks', { params });
      setTasks(data.tasks);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterPriority]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  async function handleCreate(payload) {
    await api.post('/tasks', payload);
    fetchTasks();
  }

  async function handleUpdate(payload) {
    await api.put(`/tasks/${editing.id}`, payload);
    setEditing(null);
    fetchTasks();
  }

  async function handleDelete(id) {
    if (!confirm('Excluir esta tarefa?')) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  }

  async function handleToggleDone(task) {
    const newStatus = task.status === 'done' ? 'pending' : 'done';
    await api.put(`/tasks/${task.id}`, { status: newStatus });
    fetchTasks();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-slate-900">Minhas Tarefas</h1>
        <div className="flex gap-2">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-300">
            <option value="">Todos status</option>
            <option value="pending">Pendente</option>
            <option value="in_progress">Em Progresso</option>
            <option value="done">Concluída</option>
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-300">
            <option value="">Todas prioridades</option>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
      </div>

      {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}

      {editing ? (
        <div>
          <h2 className="text-sm font-medium text-slate-600 mb-2">Editando tarefa</h2>
          <TaskForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        </div>
      ) : (
        <TaskForm onSubmit={handleCreate} />
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <TaskList tasks={tasks} onEdit={setEditing} onDelete={handleDelete} onToggleDone={handleToggleDone} />
      )}
    </div>
  );
}
