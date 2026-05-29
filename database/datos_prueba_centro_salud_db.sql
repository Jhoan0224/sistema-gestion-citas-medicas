-- data for database

use centro_salud_db;

insert into especialidad(nombre, capacidad_atencion_diaria) values
('Medicina General', 18),
('Pediatria', 14),
('Ginecologia', 14),
('Obstetricia', 14),
('Medicina Interna', 14),
('Enfermeria', 25),
('Cirugia General', 8),
('Traumatologia', 12),
('Odontologia', 14),
('Laboratorio Clinico', 40),
('Farmacia', 60),
('Psicologia', 8),
('Vacunacion', 30),
('Cardiologia', 10),
('Dermatologia', 14),
('Neurologia', 8),
('Nutricion', 16),
('Radiologia', 25),
('Urologia', 12),
('Oftalmologia', 14);


insert into sintomas(nombre, nivel_triage) values
('No presenta ningun Signo', 5),
('Falta de aire severa', 1),
('Dolor intenso', 2),
('Dolor abdominal severo', 2),
('Vomitos persistentes', 2),
('Mareo intenso', 2),
('Tos persistente', 3),
('Diarrea', 3),
('Nauseas', 3),
('Dolor de cabeza', 3),
('Fatiga', 4),
('Insomnio', 4),
('Ansiedad', 4),
('Perdida de apetito', 4),
('Estrenimiento', 4),
('Molestia leve general', 5),
('Tos leve', 5),
('Dolor leve', 5);

insert into signos(nombre, nivel_triage) values
('No presenta ningun Sintoma', 5),
('Cianosis', 1),
('Sangrado abundante', 1),
('Alteraciones respiratorias graves', 1),
('Taquicardia severa', 1),
('Fiebre alta', 2),
('Deshidratacion', 2),
('Hipertension arterial severa', 2),
('Ganglios inflamados dolorosos', 2),
('Edema', 3),
('Inflamacion', 3),
('Erupciones cutaneas', 3),
('Palidez', 3),
('Perdida de peso', 3),
('Soplos cardiacos leves', 4),
('Fiebre leve', 5);


insert into especialidad_signos_sintomas(id_especialidad, id_signo, id_sintoma) values
-- Medicina General
(1, 1, 1),   -- Sin signos/sintomas relevantes
(1, 6, 7),
(1, 11, 18),
(1, 15, 11),
(1, 16, 17),
(1, 13, 14),
-- Pediatria
(2, 6, 7),
(2, 7, 8),
(2, 16, 17),
(2, 13, 11),
(2, 14, 14),
-- Ginecologia
(3, 11, 4),
(3, 6, 9),
(3, 7, 5),
(3, 14, 14),
(3, 12, 18),
-- Obstetricia
(4, 3, 4),
(4, 6, 5),
(4, 7, 9),
(4, 2, 2),
(4, 14, 11),
-- Medicina Interna
(5, 2, 2),
(5, 4, 2),
(5, 6, 4),
(5, 7, 5),
(5, 8, 6),
(5, 9, 11),
(5, 13, 14),
(5, 14, 11),
-- Enfermeria
(6, 1, 1),   -- Sin signos/sintomas relevantes
(6, 16, 16),
(6, 11, 18),
(6, 13, 11),
(6, 6, 17),
(6, 7, 8),
-- Cirugia General
(7, 3, 3),
(7, 3, 4),
(7, 11, 18),
(7, 6, 5),
(7, 7, 8),
-- Traumatologia
(8, 11, 3),
(8, 10, 18),
(8, 13, 11),
(8, 3, 3),
(8, 4, 6),
-- Odontologia
(9, 11, 18),
(9, 6, 3),
(9, 14, 14),
(9, 13, 18),
(9, 16, 16),
-- Laboratorio Clinico
(10, 6, 4),
(10, 7, 8),
(10, 13, 14),
(10, 14, 11),
(10, 12, 7),
-- Farmacia
(11, 16, 16),
(11, 11, 18),
(11, 6, 17),
(11, 13, 11),
(11, 15, 12),
-- Psicologia
(12, 13, 13),
(12, 15, 12),
(12, 14, 11),
(12, 16, 16),
(12, 11, 13),
-- Vacunacion
(13, 16, 16),
(13, 6, 17),
(13, 11, 18),
(13, 13, 11),
(13, 14, 14),
-- Cardiologia
(14, 2, 2),
(14, 5, 6),
(14, 8, 6),
(14, 9, 11),
(14, 10, 3),
(14, 15, 11),
-- Dermatologia
(15, 12, 18),
(15, 11, 18),
(15, 6, 16),
(15, 13, 14),
(15, 14, 14),
-- Neurologia
(16, 5, 6),
(16, 13, 10),
(16, 15, 12),
(16, 14, 11),
(16, 11, 18),
-- Nutricion
(17, 14, 14),
(17, 13, 11),
(17, 7, 8),
(17, 15, 14),
(17, 16, 15),
-- Radiologia
(18, 11, 4),
(18, 12, 18),
(18, 10, 3),
(18, 14, 14),
(18, 6, 7),
-- Urologia
(19, 11, 4),
(19, 6, 9),
(19, 7, 5),
(19, 14, 14),
(19, 10, 15),
-- Oftalmologia
(20, 13, 10),
(20, 11, 18),
(20, 6, 16),
(20, 14, 11),
(20, 16, 17);


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

insert into privilegio(nombre) values
('CREATE_USERS'),
('READ_USERS'),
('UPDATE_USERS'),
('DELETE_USERS'),
('VIEW_REPORTS'),
('MANAGE_SETTINGS'),
('EXPORT_DATA'),
('AUDIT_LOGS');