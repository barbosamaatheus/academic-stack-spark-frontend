**Universidade Federal da Paraíba - UFPB** \
**Centro de Ciências Exatas e Educação - CCAE** \
**Departamento de Ciências Exatas - DCX**

**Professor:** [Matheus Barbosa de Oliveira](https://github.com/barbosamaatheus)

---

# Academic Stack Spark - Frontend

Este é um projeto de referência para os alunos das disciplinas de Análise e Projeto de Sistemas e Projeto de Sistemas Orientados a Objetos dos cursos de Sistemas de Informação e Lic. em Ciência da Computação da UFPB, campus IV em Rio Tinto.

🚨 Atenção: Este projeto foi desenvolvido para servir como base para a implementação do projeto da disciplina. Ele é incompleto e possui vários pontos de melhoria propositais, que serão discutidos em sala de aula. Deste modo, não considere cegamente este projeto como uma referência para boas práticas de programação e um bom design. Repito, eu coloquei propositalmente alguns problemas de design que serão discutidos em sala de aula.


## Sobre o Projeto

Este é o frontend de uma aplicação estilo Stack Overflow desenvolvida para fins acadêmicos.

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

- Node.js 18+ e npm. [baixe aqui](https://nodejs.org/pt/download)
- Backend Java/Javalin rodando na porta 7000

### Instalação

1. **Instale as dependências**

```bash
npm install
```

1. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
# Edite o arquivo .env conforme necessário
```

1. **Execute o projeto**

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

- `POST /login` - Login do usuário
- `POST /cadastrar` - Cadastro de usuário
- `GET /me` - Dados do usuário atual

### Perguntas

- `GET /perguntas` - Listar todas as perguntas
- `GET /perguntas/{id}` - Obter pergunta específica
- `POST /perguntas` - Criar nova pergunta
- `PUT /perguntas/{id}` - Editar pergunta
- `DELETE /perguntas/{id}` - Deletar pergunta

### Respostas

- `GET /perguntas/{id}/answers` - Listar respostas de uma pergunta
- `POST /perguntas/{id}/respostas` - Criar resposta
- `PUT /perguntas/{id}` - Editar resposta
- `DELETE /perguntas/{id}` - Deletar resposta
- `PUT /perguntas/{id}/respostas` - Aceitar resposta

### Votos

- `POST /perguntas/{id}/vote` - Votar em pergunta
- `POST /perguntas/{id}/vote` - Votar em resposta
- `DELETE /perguntas/{id}/vote` - Remover voto da pergunta
- `DELETE /perguntas/{id}/vote` - Remover voto da resposta

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

## Aviso
Este projeto foi desenvolvido com [Lovable](https://lovable.dev/).
