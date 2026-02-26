create database if not exists centro_salud_db;

use centro_salud_db;

create table usuario(
	id_usuario int auto_increment primary key,
	nombre varchar(50),
	apellido varchar(50),
	dui varchar(10),
	fecha_naciento date,
	email varchar(256),
	pass varchar(256),
	zona_residencia varchar(128),
	estado_laboral_formal boolean,
	condicion_medica boolean
);
