create database centro_salud_db;

use centro_salud_db;

create table ocupaciones(
	id int auto_increment primary key,
	nombre varchar(50)
);

create table condiciones(
	id int auto_increment primary key,
	nombre varchar(50)
);

create table especialidad(
	id int auto_increment primary key,
	nombre varchar(50)
);

create table estado_cita(
	id int auto_increment primary key,
	nombre varchar(50)
);

create table signos(
	id int auto_increment primary key,
	nombre varchar(50)
);

create table sintomas(
	id int auto_increment primary key,
	nombre varchar(50)
);

create table usuario(
	id int auto_increment primary key,
	nombre varchar(50),
	apellido varchar(50),
	dui varchar(15),
	fecha_nacimiento date,
	email varchar(256),
	pass_hash varchar(256),
	zona_residencia varchar(50),
	id_ocupacion int,
	id_condicion int,
	constraint fkOcupacion_Usuario foreign key (id_ocupacion) references ocupaciones(id)
		on delete set null,
	constraint fkCondicion_Usuario foreign key (id_condicion) references condiciones(id)
		on delete set null
);

create table cita(
	id int auto_increment primary key,
	titulo varchar(30),
	motivo varchar(255),
	fecha_hora_atencion datetime,
	fecha_hora_registro timestamp default CURRENT_TIMESTAMP(),
	id_estado_cita int,
	id_usuario int,
	id_espcialidad int,
	constraint fkEstadoCita_Cita foreign key (id_estado_cita) references estado_cita(id)
		on delete set null,
	constraint fkUsuario_Cita foreign key (id_usuario) references usuario(id)
		on delete cascade,
	constraint fkEspecialidad_Cita foreign key (id_espcialidad) references especialidad(id)
		on delete set null		
);

create table cita_signos(
	id int auto_increment primary key,
	id_cita int,
	constraint fkCita_CitaSignos foreign key (id_cita) references cita(id)
		on delete cascade
);

create table cita_sintomas(
	id int auto_increment primary key,
	id_sintoma int,
	constraint fkSintoma_CitaSintomas foreign key (id_sintoma) references sintomas(id)
		on delete cascade
);









