-- data for database

use centro_salud_db;

insert into especialidad(nombre) values
('Medicina General'),
('Cardiología'),
('Pediatría'),
('Dermatología'),
('Ginecología y Obstetricia'),
('Neurología'),
('Psiquiatría'),
('Oftalmología'),
('Traumatología'),
('Oncología'),
('Endocrinología');

insert into sintomas(nombre) values
('Cefalea'),
('Náuseas'),
('Astenia'),
('Disnea');

insert into signos(nombre) values
('Fiebre'),
('Ictericia'),
('Taquicardia'),
('Edema');

insert into ocupaciones(nombre) values
('Empleado sector privado'),
('Empleado sector público'),
('Trabajador independiente / Freelance'),
('Emprendedor / Dueño de negocio'),
('Estudiante'),
('Desempleado / En búsqueda de empleo'),
('Jubilado / Pensionado'),
('Labores del hogar'),
('Otro');

insert into condiciones(nombre) values
('Ninguna'),
('Discapacidad motriz'),
('Discapacidad visual'),
('Discapacidad auditiva'),
('Discapacidad intelectual'),
('Condición de salud crónica'),
('Neurodivergencia (TEA, TDAH, etc.)'),
('Otra condición'),
('Prefiero no decirlo');

insert into estado_cita(nombre) values
('Agendada'), ('Confirmada'), ('Asistida'), ('Cancelada'), ('Inasistida');

insert into rol(nombre) values
('USUARIO'), ('PERSONAL_MEDICO'), ('ADMIN'), ('AUDITOR');

