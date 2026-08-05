# 📋 TaskManager — Full Stack Gerenciador de Tarefas

**Producer DCS®** | v1.0.0

Aplicação completa de gerenciamento de tarefas com autenticação JWT, CRUD, filtros e interface responsiva.

---

## ✨ Funcionalidades

- 🔐 Autenticação (Registro + Login) com JWT
- ✅ CRUD completo de tarefas
- 🏷️ Status: Pendente · Em Progresso · Concluída
- 🎯 Prioridade: Baixa · Média · Alta
- 🔍 Filtros por status e prioridade
- 📱 UI responsiva (mobile-first)
- 💾 Banco SQLite (zero configuração)

---

## 🏗️ Stack

| Camada | Tecnologia |
|--------|------------|
| **Backend** | Node.js · Express · SQLite3 · JWT · bcrypt |
| **Frontend** | React 18 · Vite · Tailwind CSS · React Router · Axios |
| **Auth** | JSON Web Token (JWT) |

---

## 🚀 Como rodar

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
# → http://localhost:3001
```

### 2. Frontend (outro terminal)

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

Abra [http://localhost:5173](http://localhost:5173)

---

## 📁 Estrutura

```
task-manager/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── config/database.js
│       ├── controllers/ (auth + tasks)
│       ├── middleware/auth.js
│       └── routes/ (auth + tasks)
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx · main.jsx · index.css
│       ├── context/AuthContext.jsx
│       ├── services/api.js
│       ├── pages/ (Login, Register, Dashboard)
│       └── components/ (Layout, TaskForm, TaskList)
├── docs/
│   └── ROADMAP.md
├── README.md
└── .gitignore
```

---

## 📡 API Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/auth/register` | Criar conta | Não |
| POST | `/api/auth/login` | Entrar | Não |
| GET | `/api/auth/me` | Usuário logado | Sim |
| GET | `/api/tasks` | Listar tarefas | Sim |
| POST | `/api/tasks` | Criar tarefa | Sim |
| PUT | `/api/tasks/:id` | Atualizar | Sim |
| DELETE | `/api/tasks/:id` | Remover | Sim |

---

## 🗺️ Roadmap

Veja [docs/ROADMAP.md](docs/ROADMAP.md) para as fases do projeto (MVP → Produção).

---

## 📄 Licença

MIT © 2026 Producer DCS · [producerdcs-cpu](https://github.com/producerdcs-cpu)

---

**TaskManager** — Organize suas tarefas com simplicidade e segurança.
