# 🧠 Webhook Inspector AI

Ferramenta **full-stack** para inspecionar e debugar webhooks em tempo real, com integração de **IA** para análise e geração automatizada de código TypeScript.  
Desenvolvida com **Fastify**, **PostgreSQL**, **Drizzle ORM**, **React**, **TailwindCSS**, **TanStack Query** e **Google Gemini API**.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Back-end
- **Fastify** — servidor leve e performático  
- **TypeScript** — tipagem segura em todo o projeto  
- **Drizzle ORM** — mapeamento de dados com PostgreSQL  
- **Zod** — validação de schemas  
- **Swagger + Scalar** — documentação interativa da API  
- **fastify-type-provider-zod** — integração entre Fastify e Zod  
- **Faker.js** — geração de dados de teste  

### 💻 Front-end
- **React + Vite** — setup rápido e performático  
- **TailwindCSS v4** — estilização moderna e responsiva  
- **TanStack Query** — gerenciamento de estado assíncrono e cache  
- **TanStack Router** — rotas automáticas type-safe  
- **Radix UI** — componentes acessíveis e reutilizáveis  
- **Shiki** — syntax highlighting para payloads JSON  
- **react-resizable-panels** — layout dinâmico e interativo  

### 🤖 Integração com IA
- **Google Gemini API (gemini-2.0-flash-exp)**  
  Utilizada para análise de payloads e **geração automática de código TypeScript** para handlers de webhooks.

---

## ⚙️ Funcionalidades

✅ Criação de endpoints dinâmicos para captura de webhooks  
✅ Armazenamento e visualização em tempo real dos payloads  
✅ Listagem, visualização e exclusão de webhooks capturados  
✅ Interface interativa para inspeção de requisições/respostas HTTP  
✅ Editor de JSON com syntax highlighting  
✅ Busca e filtros inteligentes com TanStack Query  
✅ Geração automatizada de código com IA  
✅ Painel com layout redimensionável e UI acessível  

---

## 🧩 Estrutura do Projeto

/apps
├── backend # Fastify + PostgreSQL + Drizzle ORM
└── frontend # React + Vite + TailwindCSS

/packages
├── shared # Tipos e utilitários compartilhados
├── db # Schemas e queries do Drizzle
└── ai # Integração com Google Gemini

---

## 🧠 Como Executar Localmente

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seu-usuario/webhook-inspector-ai.git
cd webhook-inspector-ai

2️⃣ Instale as dependências

npm install

3️⃣ Configure o ambiente
Crie um arquivo .env com as variáveis necessárias:

DATABASE_URL=postgresql://user:password@localhost:5432/webhooks
GEMINI_API_KEY=sua_chave_aqui

4️⃣ Execute o projeto
npm run dev
O back-end e o front-end serão inicializados juntos via Turborepo.

🧪 Scripts Principais
npm run dev	Executa o projeto em modo desenvolvimento
npm run build	Cria a build de produção
npm run db:push	Atualiza o schema do banco com Drizzle
npm run seed	Popula o banco com dados de teste
