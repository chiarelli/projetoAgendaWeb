# 🌐 Projeto Agenda Web

Este é o frontend do sistema **Agenda**, desenvolvido com **Angular 17**, que tem como objetivo consumir a API REST do projeto [Agenda API](https://github.com/chiarelli/projetoAgendaApiBackend) e oferecer uma interface amigável para cadastro e gerenciamento de tarefas e categorias.

Atualmente, o projeto está em estágio inicial, com estrutura básica e uma interface de exemplo (_Hello World_).  

---

### 🛠 Tecnologias utilizadas

- Angular 17  
- TypeScript  
- Bootstrap 5  
- HTML5 / CSS3  
- Angular CLI  
- Node.js 

---

### 🧱 Estrutura inicial do projeto

A estrutura do projeto segue a arquitetura padrão Angular com divisão clara entre componentes de páginas e componentes compartilhados.

#### 📂 Componentes já implementados:

- `TopMenuComponent` – Menu de navegação principal  
- `CadastroTarefasComponent` – Tela de cadastro de tarefas (em desenvolvimento)  
- `AppComponent` – Componente principal da aplicação  

---

### 🔌 Integração com a API

Este frontend irá se comunicar com a API do projeto [Agenda API](https://github.com/seu-usuario/projeto-agenda-api), através de requisições HTTP para os seguintes endpoints:

- `/api/v1/tarefas`  
- `/api/v1/categorias`  

> ℹ️ As URLs reais e o consumo de serviços HTTP ainda estão sendo configurados.

---

### ▶️ Como executar o projeto

#### 1. Instale as dependências

Certifique-se de que o **Node.js** e o **Angular CLI** estão instalados.

```bash
npm install
```

#### 2. Execute a aplicação em modo desenvolvimento

```bash
ng serve -o
```

#### Acesse no navegador:

🔗 http://localhost:4200

---
### ✅ Status atual

- [x] Estrutura inicial do projeto gerada com Angular CLI

- [x] Estilização com Bootstrap

- [x] Componente de menu implementado

- [ ] Componente de cadastro de tarefas

- [ ] Serviço HTTP para integração com backend

- [ ] Rotas e navegação entre páginas

- [ ] Testes unitários

- [ ] Deploy em ambiente de produção

---
#### 👨‍💻 Autor
Feito por Raphael Mathias Chiarelli Gomes durante o desenvolvimento do sistema Agenda completo (Frontend + Backend).