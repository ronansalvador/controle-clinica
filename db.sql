CREATE DATABASE Clinica;
USE Clinica;

CREATE TABLE cliente (
  id INT NOT NULL AUTO_INCREMENT,
  Nome VARCHAR(255) NOT NULL,
  Telefone VARCHAR(20) NOT NULL,
  Endereço VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE tipo_atendimento (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE forma_de_pagamento (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE local_atendimento (
  id INT NOT NULL AUTO_INCREMENT,
  local VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sessao (
  id INT NOT NULL AUTO_INCREMENT,
  Data DATE NOT NULL,
  id_cliente INT NOT NULL,
  id_tipo_atendimento INT NOT NULL,
  id_local_atendimento INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  numero_sessao INT,
  id_forma_de_pagamento INT NOT NULL,
  confirmacao_pagamento BOOLEAN NOT NULL,
  data_pagamento DATE,
  pacote_ativo: BOOLEAN NOT NULL,
  sessao_pacote: INT,
  PRIMARY KEY (id),
  FOREIGN KEY (id_cliente) REFERENCES cliente(id),
  FOREIGN KEY (id_tipo_atendimento) REFERENCES tipo_atendimento(id),
  FOREIGN KEY (id_local_atendimento) REFERENCES local_atendimento(id),
  FOREIGN KEY (id_forma_de_pagamento) REFERENCES forma_de_pagamento(id)
);

