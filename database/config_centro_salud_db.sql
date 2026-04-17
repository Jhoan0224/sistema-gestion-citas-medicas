use centro_salud_db;

create user 'admin_centro_salud'@'localhost'
identified  by 'CentroSalud2023';

grant all on centro_salud_db.* to 'admin_centro_salud'@'localhost';

show grants for 'admin_centro_salud'@'localhost';
