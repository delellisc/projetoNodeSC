# Projeto Node - Sistemas Corporativos
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

## Exemplos de requisições
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