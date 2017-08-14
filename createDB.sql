CREATE TABLE todosql (
id serial PRIMARY KEY,
task VARCHAR(140) NOT NULL,
complete BOOLEAN NOT NULL);

INSERT INTO todoSQL (task, complete) VALUES ('dishes', false), ('mopping', true), ('laundry', false);
