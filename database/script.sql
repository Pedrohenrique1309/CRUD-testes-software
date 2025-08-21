CREATE DATABASE db_clientes_teste_software

USE db_clientes_teste_software;

CREATE TABLE tbl_clientes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);