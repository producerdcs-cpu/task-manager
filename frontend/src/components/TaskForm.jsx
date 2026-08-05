import { useState } from 'react';

export default function TaskForm({ onSubmit, initial, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [status, setStatus] = useState(initial?.status || 'pending');
  const [priority, setPriority] = useState(initial?.priority || 'medium');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), description, status, priority });
      if (!initial) {
        setTitle('');
        setDescription('');
        setStatus('pending');
        setPriority('medium');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
      <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da tarefa"
        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição (opcional)" rows={2}
        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none resize-none" />
      <div className="flex flex-wrap gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 text-sm">
          <option value="pending">Pendente</option>
          <option value="in_progress">Em Progresso</option>
          <option value="done">Concluída</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 text-sm">
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
        <div className="flex gap-2 ml-auto">
          {onCancel && (
            <button type="button" onClick={onCancel}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">Cancelar</button>
          )}
          <button type="submit" disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium disabled:opacity-60">
            {loading ? 'Salvando...' : initial ? 'Atualizar' : 'Adicionar'}
          </button>
        </div>
      </div>
    </form>
  );
}
