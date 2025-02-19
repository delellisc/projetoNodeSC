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

Abrindo no VSCode e criando um README.md:
```sh
code .
touch README.md
```

Criando um repositório git:
```sh
git init
```

## Testando os serviços usando o aplicativo Postman
| **Método HTTP** | **URL**                            | **Operação**                                                                               |
|-----------------|------------------------------------|--------------------------------------------------------------------------------------------|
| GET             | http://localhost:8080/api/alunos   | Recupera todos os registros da tabela “aluno”                                              |
| GET             | http://localhost:8080/api/alunos/1 | Recupera um único registro de “aluno” cujo idaluno = 1 (o valor 1 é apenas um exemplo)     |
| POST            | http://localhost:8080/api/alunos   | Adiciona um novo aluno                                                                     |
| PUT             | http://localhost:8080/api/alunos/1 | Atualiza o registro em aluno cujo idaluno = 1 (o valor 1 é apenas um exemplo)              |
| DELETE          | http://localhost:8080/api/alunos   | Remove todos os alunos (apenas para fins didáticos pois este não é um serviço recomendado) |
| DELETE          | http://localhost:8080/api/alunos/1 | Exclui o registro em aluno cujo idaluno = 1 (o valor 1 é apenas um exemplo)                |