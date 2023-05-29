
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

- execute o comando abaixo para iniciar um banco de dados mysql com docker:

```bash
npm run compose:up
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


- Inicie a aplicação: este comando utlizado o docker para criar um container com Mysql

```bash
npm run start
```