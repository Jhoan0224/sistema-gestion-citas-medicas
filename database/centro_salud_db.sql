create database if not exists centro_salud_db;

use centro_salud_db;

create table usuario(
	id int auto_increment primary key,
	nombre varchar(50),
	apellido varchar(50),
	dui varchar(10),
	fecha_nacimiento date,
	email varchar(256),
	pass varchar(256),
	zona_residencia varchar(128),
	estado_laboral_formal boolean,	
	condicion_medica boolean
);

create table estado_cita(
	id int auto_increment primary key,
	nombre varchar(50)
);

create table especialidad(
	id int auto_increment primary key,
	nombre varchar(60),
	atencion_diaria_max int
);


create table cita(
  id int auto_increment primary key,
  nombre varchar(50),
  motivo varchar(300),
  fecha_atencion datetime,
  fecha_hora_registro timestamp default CURRENT_TIMESTAMP(),
  id_estado_cita int,
  id_usuario int,
  id_especialidad int,
  constraint fkUsuario_Cita foreign key (id_usuario) references usuario(id)
  	on delete cascade,
  constraint fkEstadoCita_Cita foreign key (id_estado_cita) references estado_cita(id)
  	on delete cascade,
	constraint fkEspecialidad_Cita foreign key (id_especialidad) references especialidad(id);
);
