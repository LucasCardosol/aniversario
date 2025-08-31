# 🎉 Lista de Convidados - Aniversário

Sistema completo para gerenciar lista de convidados para aniversário, com interface elegante e responsiva.

## ✨ Funcionalidades

- **Adicionar Convidados**: Cadastre novos convidados com nome e parceiro opcional
- **Gerenciar Casais**: Adicione parceiros para formar casais
- **Status de Confirmação**: Marque se o convidado confirmou presença ou não
- **Editar/Remover**: Modifique informações ou remova convidados
- **Estatísticas**: Visualize total, confirmados, não confirmados e casais
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

## 🛠️ Tecnologias

- **Frontend**: React 18 + CSS3
- **Backend**: Node.js + Express
- **Banco de Dados**: SQLite
- **Ícones**: Lucide React
- **Estilização**: CSS puro com design moderno

## 🚀 Instalação

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd aniversario
```

2. **Instale as dependências**
```bash
npm run install-all
```

3. **Inicie o servidor backend**
```bash
npm run dev
```

4. **Em outro terminal, inicie o frontend**
```bash
npm run client
```

5. **Acesse a aplicação**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Como Usar

### Adicionar Convidado
1. Clique em "Adicionar Convidado"
2. Preencha o nome (obrigatório)
3. Adicione o parceiro se for casal (opcional)
4. Clique em "Adicionar"

### Gerenciar Confirmações
- Clique no botão ✅ para confirmar presença
- Clique no botão ❌ para marcar como não confirmado

### Editar Convidado
1. Clique no botão de editar (✏️)
2. Modifique as informações
3. Clique em "Atualizar"

### Remover Convidado
1. Clique no botão de deletar (🗑️)
2. Confirme a remoção

## 🗄️ Estrutura do Banco

```sql
CREATE TABLE convidados (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  parceiro TEXT,
  confirmado BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 📁 Estrutura do Projeto

```
aniversario/
├── server.js              # Servidor Express + SQLite
├── package.json           # Dependências do backend
├── client/                # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── styles/        # Estilos CSS
│   │   └── App.js         # Componente principal
│   └── package.json       # Dependências do React
└── README.md
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em desenvolvimento
- `npm run client` - Inicia o React em desenvolvimento
- `npm run build` - Build do React para produção
- `npm run install-all` - Instala todas as dependências

## 🌐 API Endpoints

- `GET /api/convidados` - Lista todos os convidados
- `POST /api/convidados` - Adiciona novo convidado
- `PUT /api/convidados/:id` - Atualiza convidado
- `PUT /api/convidados/:id/confirmar` - Atualiza status de confirmação
- `DELETE /api/convidados/:id` - Remove convidado
- `GET /api/stats` - Retorna estatísticas

## 🎨 Design Features

- **Gradiente moderno** no background
- **Cards com sombras** e efeitos hover
- **Ícones intuitivos** para melhor UX
- **Responsivo** para todos os dispositivos
- **Animações suaves** de transição
- **Cores consistentes** e acessíveis

## 📱 Responsividade

- **Desktop**: Layout em grid com 4 colunas de estatísticas
- **Tablet**: Layout adaptado com 2 colunas
- **Mobile**: Layout em coluna única com botões full-width

## 🚀 Deploy

Para fazer deploy em produção:

1. **Build do React**
```bash
npm run build
```

2. **Configure a variável de ambiente**
```bash
export NODE_ENV=production
```

3. **Inicie o servidor**
```bash
npm start
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para organizar seu aniversário!**
