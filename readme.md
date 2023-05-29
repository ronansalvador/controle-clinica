# Controle Clinica


- Clone o projeto

```bash
git clone git@github.com:ronansalvador/controle-clinica.git
```

- Entre no diretório do projeto

```bash
cd controle-clinica
```

- Instale as dependências do projeto

```bash
npm install
```

- Renomeie o arquivo .env.example dentro da pasta backend para .env e altere as informações necessarias:

```bash
API_PORT= Porta para execução do backend
MYSQL_HOST=localhost
MYSQL_PORT= porta para execução do banco de dados
MYSQL_USER= usuario do banco de dados
MYSQL_PASSWORD=senha do banco de dados
MYSQL_DB_NAME=clinica
```

- Renomeie o arquivo .env.example na pasta raiz do projeto para .env e altere a senha do banco de dados que sera utilizado pelo docker:

```bash
MYSQL_PASSWORD=password
```


- Inicie a aplicação: este comando utlizado o docker para criar um container com Mysql

```bash
npm run start
```