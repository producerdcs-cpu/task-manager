# 📋 TaskManager — Full Stack Gerenciador de Tarefas

<p align="center">
  <img src="https://raw.githubusercontent.com/producerdcs-cpu/task-manager/main/assets/logo.svg" alt="TaskManager" width="100%"/>
</p>

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
├── frontend/
├── docs/ROADMAP.md
├── assets/logo.svg
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

Veja [docs/ROADMAP.md](docs/ROADMAP.md).

---

## 📄 Licença

MIT © 2026 Producer DCS · [producerdcs-cpu](https://github.com/producerdcs-cpu)

**TaskManager** — Organize suas tarefas com simplicidade e segurança.
