# Expense Tracker API

Este projeto consiste em uma API REST para gerenciamento de despesas pessoais, utilizando Node.js, Express, Prisma ORM e um banco de dados PostgreSQL.

## Funcionalidades

- Autenticação de Usuários (Login com JWT)
- Gerenciamento de Usuários (Cadastro, listagem, edição e remoção)
- Gerenciamento de Despesas (Criação, listagem e remoção de despesas)
- Filtragem de Despesas (Por período: última semana, último mês, últimos 3 meses e intervalo customizado)

## Tecnologias Utilizadas

- Node.js e Express para o backend
- Prisma ORM para manipulação do banco de dados
- PostgreSQL como banco de dados
- Docker para conteinerização do banco de dados
- JWT para autenticação segura
- bcrypt.js para hash de senhas
- dotenv para gerenciar variáveis de ambiente

## Como Executar o Projeto

### 1. Clonar o repositório

```sh
git clone https://github.com/seu-usuario/expense-tracker-api.git
cd expense-tracker-api
```

### 2. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis com base no `.env.example`:

```env
PORT=3000
SECRET="seu_segredo"
DATABASE_URL="postgresql://usuario:senha@localhost:5432/expensesTracker"
```

### 3. Subir o banco de dados com Docker

```sh
docker-compose up -d
```

### 4. Instalar as dependências

```sh
npm install
```

### 5. Rodar as migrações do banco de dados

```sh
npx prisma migrate dev --name init
```

### 6. Iniciar o servidor

```sh
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## Endpoints

Todas as rotas abaixo, com exceção das rotas de autenticação (`/auth`), requerem autenticação via JWT.

### Autenticação

- `POST /auth/login` - Login de usuário

### Usuários (Requer Autenticação)

- `GET /user` - Lista todos os usuários
- `GET /user/:id` - Obtém um usuário pelo ID
- `POST /user` - Cria um novo usuário
- `PATCH /user/:id` - Atualiza um usuário existente
- `DELETE /user/:id` - Remove um usuário

### Despesas (Requer Autenticação)

- `GET /expense/user/:userId` - Lista todas as despesas de um usuário
- `GET /expense/user/:userId/past-week` - Lista despesas da última semana
- `GET /expense/user/:userId/last-month` - Lista despesas do último mês
- `GET /expense/user/:userId/last-3-month` - Lista despesas dos últimos 3 meses
- `GET /expense/user/:userId/customRange?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Lista despesas em um intervalo específico
- `POST /expense` - Cria uma nova despesa
- `PATCH /expense/:id` - Atualiza uma despesa
- `DELETE /expense/:id` - Remove uma despesa

---

Criado por [Alfredo Lucas](https://github.com/alfredolsn)
