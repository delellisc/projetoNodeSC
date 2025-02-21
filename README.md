# Projeto Node - Sistemas Corporativos

## Instalação do Node.js no Linux
Download e instalação do nvm (Node Version Manager):
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
```

Download e instalação do Node.js (Versão 22.14.0 LTS):
```sh
nvm install 22
```

Após o extenso processo de instalação do Node, verifica-se a versão desejada foi instalada:
```sh
node -v
```

Saída esperada:
```sh
v22.14.0
```

## Criando e inicializando o projeto
Criando o projeto:
```sh
mkdir projetoNPMSC
```

Inicializando o projeto node por meio do comando "npm init":
```sh
cd projetoNPMSC/
npm init -y
```

Instalando as bibliotecas necessárias:
```sh
npm i express pg cors
```

Criando a estrutura de arquivos requisitada:
```sh
mkdir config controllers models routes
touch controllers/aluno.controller.js models/aluno.model.js models/db.config.js models/db.js routes/aluno.routes.js
touch server.js
```

Abrindo no Visual Studio Code e criando um README.md:
```sh
code .
touch README.md
```

Criando um repositório git:
```sh
git init
```

Em seguida, realizei a criação do repositório remoto por meio da interface web do GitHub e realizei o push, publicando minha branch main, por meio da ferramenta de versionamento do VSCode.

## Testando os serviços usando o aplicativo Postman
| **Método HTTP** | **URL**                            | **Operação**                                                                               |
|-----------------|------------------------------------|--------------------------------------------------------------------------------------------|
| GET             | http://localhost:8080/api/alunos   | Recupera todos os registros da tabela “aluno”                                              |
| GET             | http://localhost:8080/api/alunos/1 | Recupera um único registro de “aluno” cujo idaluno = 1 (o valor 1 é apenas um exemplo)     |
| POST            | http://localhost:8080/api/alunos   | Adiciona um novo aluno                                                                     |
| PUT             | http://localhost:8080/api/alunos/1 | Atualiza o registro em aluno cujo idaluno = 1 (o valor 1 é apenas um exemplo)              |
| DELETE          | http://localhost:8080/api/alunos   | Remove todos os alunos (apenas para fins didáticos pois este não é um serviço recomendado) |
| DELETE          | http://localhost:8080/api/alunos/1 | Exclui o registro em aluno cujo idaluno = 1 (o valor 1 é apenas um exemplo)                |

## Requisições alunos
### Retornar todos os alunos
GET - http://localhost:8080/api/alunos

Reposta no terminal do servidor:
```sh
alunos:  [
  { idaluno: 1, nome: 'Fábio' },
  { idaluno: 4, nome: 'Samuel' },
  { idaluno: 36, nome: 'Cano' },
  { idaluno: 37, nome: 'Árias' },
  { idaluno: 40, nome: 'Cannobbio' },
  { idaluno: 41, nome: 'Lelê' }
]
```

### Retornar um aluno via ID
GET - http://localhost:8080/api/alunos/1

Reposta no terminal do servidor:
```sh
findById id =  1
aluno encontrado:  { idaluno: 1, nome: 'Fábio' }
```

### Criar um aluno
POST - http://localhost:8080/api/alunos

Entrada do POSTMAN:
```json
{
    "nome":"Riquelme"
}
```

Resposta no terminal do servidor:
```sh
created aluno:  { id: undefined, idaluno: undefined, nome: 'Riquelme' }
```

### Atualizar um aluno
PUT - http://localhost:8080/api/alunos/4

Entrada do POSTMAN:
```json
{
    "nome":"Isaque"
}
```

Resposta no terminal do servidor:
```sh
updated aluno:  { id: '4', idaluno: undefined, nome: 'Isaque' }
```

### Remover um aluno
DELETE - http://localhost:8080/api/alunos/36

Resposta no terminal do servidor:
```sh
deleted aluno with idaluno:  36
```

### Remover todos os alunos
DELETE - http://localhost:8080/api/alunos

Rota criada apenas por fins didáticos, não realizarei uma requisição para essa rota agora.

## Requisições livros
### Retornar todos os livros
GET - http://localhost:8080/api/livros

Reposta no terminal do servidor:
```sh
livros:  [
  { idlivro: 1, nome: 'Fábio' },
  { idlivro: 4, nome: 'Samuel' },
  { idlivro: 36, nome: 'Cano' },
  { idlivro: 37, nome: 'Árias' },
  { idlivro: 40, nome: 'Cannobbio' },
  { idlivro: 41, nome: 'Lelê' }
]
```

### Retornar um livro via ID
GET - http://localhost:8080/api/livros/1

Reposta no terminal do servidor:
```sh
findById id =  1
livros:  [ { idlivro: '1', nomelivro: 'Dr. Stone' } ]
```

### Criar um livro
POST - http://localhost:8080/api/livros

Entrada do POSTMAN:
```json
{
    "nomelivro":"Black Cover"
}
```

Resposta no terminal do servidor:
```sh
created livro:  { id: undefined, idlivro: undefined, nome: 'Riquelme' }
```

### Atualizar um livro
PUT - http://localhost:8080/api/livros/4

Entrada do POSTMAN:
```json
{
    "nomelivro":"Sun Ken Rock"
}
```

Resposta no terminal do servidor:
```sh
{ nomelivro: 'Sun Ken Rock' }
updated livro:  { id: '1', idlivro: undefined, nomelivro: 'Sun Ken Rock' }
```

### Remover um livro
DELETE - http://localhost:8080/api/livros/36

Resposta no terminal do servidor:
```sh
deleted livro with idlivro:  36
```

### Remover todos os livros
DELETE - http://localhost:8080/api/livros

Rota criada apenas por fins didáticos, não realizarei uma requisição para essa rota agora.

## Requisições empréstimos
### Criação de um empréstimo
https://localhost:3000/api/emprestimos

### Retornar todos os empréstimos
https://localhost:3000/api/emprestimos

### Retornar um empréstimo a partir do seu id
https://localhost:3000/api/emprestimos/:id

### Atualizar um empréstimo por meio do seu id
https://localhost:3000/api/emprestimos/:id

### Remover um empréstimo por meio do seu id
https://localhost:3000/api/emprestimos/:id

### Remover todos os empréstimos
https://localhost:3000/api/emprestimos

### Retornar empréstimos por meio do id do aluno
https://localhost:3000/api/emprestimos/aluno/:id

### Retornar empréstimos por meio do id do livro
https://localhost:3000/api/emprestimos/livro/:id
