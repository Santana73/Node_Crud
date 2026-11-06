create database Crud;
use crud;

create table pessoa(
	id int auto_increment primary key,
    nome varchar(255),
    email varchar(255)
);


insert into pessoa (nome,email)
values('teste','teste@gmail.com')