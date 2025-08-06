# Academic Stack - Frontend React

Sistema de perguntas e respostas estilo Stack Overflow para uso acadêmico.

## Sobre o Projeto

Este é o frontend de uma aplicação estilo Stack Overflow desenvolvida para fins acadêmicos. O projeto demonstra conceitos de programação orientada a objetos, padrões de projeto, arquitetura de software e boas práticas de desenvolvimento.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/716e6905-40ef-401a-8d55-9bb864c9facc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Tecnologias Utilizadas

Este projeto foi construído com:

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server rápido
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI reutilizáveis
- **React Router** - Roteamento client-side
- **Axios** - Cliente HTTP para comunicação com API
- **React Context API** - Gerenciamento de estado global
- **Lucide React** - Ícones SVG

## Funcionalidades

### ✅ Implementadas
- 🏠 **Página inicial** com listagem de perguntas
- 🔐 **Sistema de autenticação** (login/logout/cadastro)
- ➕ **Criar pergunta** (usuários autenticados)
- 🔍 **Busca de perguntas** por título, conteúdo e tags
- 👍👎 **Sistema de votos** em perguntas e respostas
- 📱 **Design responsivo** (desktop e mobile)
- 🎨 **Interface inspirada no Stack Overflow**

### 🚧 Em desenvolvimento
- 📝 **Página de pergunta individual** com respostas
- 💬 **Sistema de comentários**
- 👤 **Página de perfil do usuário**
- ✅ **Aceitar respostas**
- 🏆 **Sistema de reputação**

## Configuração do Ambiente

### Pré-requisitos
- Node.js 18+ e npm
- Backend Java/Javalin rodando na porta 8080

### Instalação

1. **Clone o repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd academic-stack-frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env conforme necessário
```

4. **Execute o projeto**
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:8080`

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface (shadcn/ui)
│   ├── Navbar.tsx      # Barra de navegação
│   ├── QuestionCard.tsx # Card de pergunta
│   └── VoteButtons.tsx # Botões de votação
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   ├── Login.tsx       # Página de login
│   ├── Register.tsx    # Página de cadastro
│   └── CreateQuestion.tsx # Criar pergunta
├── services/           # Serviços de API
│   └── api.ts          # Configuração Axios e endpoints
├── hooks/              # Custom hooks
├── lib/                # Utilitários
└── App.tsx            # Componente principal
```

## API Endpoints

O frontend se comunica com os seguintes endpoints do backend:

### Autenticação
- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/register` - Cadastro de usuário
- `GET /api/auth/me` - Dados do usuário atual

### Perguntas
- `GET /api/questions` - Listar todas as perguntas
- `GET /api/questions/{id}` - Obter pergunta específica
- `POST /api/questions` - Criar nova pergunta
- `PUT /api/questions/{id}` - Editar pergunta
- `DELETE /api/questions/{id}` - Deletar pergunta

### Respostas
- `GET /api/questions/{id}/answers` - Listar respostas de uma pergunta
- `POST /api/questions/{id}/answers` - Criar resposta
- `PUT /api/answers/{id}` - Editar resposta
- `DELETE /api/answers/{id}` - Deletar resposta
- `PUT /api/answers/{id}/accept` - Aceitar resposta

### Votos
- `POST /api/questions/{id}/vote` - Votar em pergunta
- `POST /api/answers/{id}/vote` - Votar em resposta
- `DELETE /api/questions/{id}/vote` - Remover voto da pergunta
- `DELETE /api/answers/{id}/vote` - Remover voto da resposta

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção

# Qualidade de código
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

## Contribuição

Este projeto é usado para fins acadêmicos. Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Conceitos Demonstrados

Este projeto demonstra:

- **Arquitetura de Software**: Separação clara entre componentes, serviços e páginas
- **Padrões de Projeto**: Context API, Custom Hooks, Component Composition
- **Boas Práticas**: TypeScript, tratamento de erros, validação de formulários
- **Design Patterns**: Observer (React Context), Strategy (diferentes tipos de voto)
- **Princípios SOLID**: Single Responsibility, Open/Closed, Dependency Inversion

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/716e6905-40ef-401a-8d55-9bb864c9facc) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
