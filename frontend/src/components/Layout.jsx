import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <span className="font-bold text-slate-900">TaskManager</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:inline">
              Olá, <strong>{user?.name}</strong>
            </span>
            <button onClick={logout}
              className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 transition">
              Sair
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
