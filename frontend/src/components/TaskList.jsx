const statusLabel = { pending: 'Pendente', in_progress: 'Em Progresso', done: 'Concluída' };
const statusColor = { pending: 'bg-amber-100 text-amber-800', in_progress: 'bg-blue-100 text-blue-800', done: 'bg-emerald-100 text-emerald-800' };
const priorityLabel = { low: 'Baixa', medium: 'Média', high: 'Alta' };
const priorityColor = { low: 'bg-slate-100 text-slate-600', medium: 'bg-indigo-100 text-indigo-700', high: 'bg-red-100 text-red-700' };

export default function TaskList({ tasks, onEdit, onDelete, onToggleDone }) {
  if (!tasks.length) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-4xl mb-2">📭</p>
        <p>Nenhuma tarefa encontrada</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id}
          className={`bg-white rounded-xl border border-slate-200 p-4 flex gap-3 items-start ${
            task.status === 'done' ? 'opacity-70' : ''
          }`}>
          <button onClick={() => onToggleDone(task)}
            className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
              task.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-brand-500'
            }`} title="Marcar como concluída">
            {task.status === 'done' && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <div className="flex-1 min-w-0">
            <p className={`font-medium ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-900'}`}>{task.title}</p>
            {task.description && <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{task.description}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[task.status]}`}>{statusLabel[task.status]}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColor[task.priority]}`}>{priorityLabel[task.priority]}</span>
            </div>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button onClick={() => onEdit(task)} className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition" title="Editar">✏️</button>
            <button onClick={() => onDelete(task.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition" title="Excluir">🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
