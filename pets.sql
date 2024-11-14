DROP TABLE IF EXISTS pet;
DROP TABLE IF EXISTS pet_owner;

CREATE TABLE pet_owner (
	id serial PRIMARY KEY,
	name varchar(50),
	age integer
);

CREATE TYPE pet_kind as ENUM('dog', 'cat', 'reptile', 'insect');

CREATE TABLE pet (
	id serial PRIMARY KEY,
	name varchar(50),
	age integer,
	weight_in_kg numeric,
	owner_id integer,
	kind pet_kind,
	FOREIGN key (owner_id) REFERENCES pet_owner (id)
);

-- Insert pet owners
INSERT INTO
	pet_owner (name, age)
VALUES
	('Alice', 30),
	('Bob', 45),
	('Carol', 28),
	('David', 52),
	('Emma', 34),
	('Frank', 40),
	('Grace', 60),
	('Hannah', 25),
	('Ian', 55),
	('Julia', 38);

INSERT INTO
	pet (name, age, weight_in_kg, owner_id, kind)
VALUES
	('Bella', 3, 12.5, 1, 'dog'),
	-- Dog owned by Alice
	('Max', 5, 15.0, 1, 'dog'),
	-- Dog owned by Alice
	('Whiskers', 2, 4.5, 2, 'cat'),
	-- Cat owned by Bob
	('Shadow', 4, 4.8, 2, 'cat'),
	-- Another Cat owned by Bob
	('Fluffy', 6, 0.05, NULL, 'insect'),
	-- Insect without an owner
	('Rex', 8, 20.0, 5, 'dog'),
	-- Dog owned by Emma
	('Goldie', 3, 0.2, NULL, 'reptile'),
	-- Reptile without an owner
	('Sasha', 4, 8.3, 6, 'cat'),
	-- Cat owned by Frank
	('Buddy', 2, 10.0, 1, 'dog'),
	-- Another Dog owned by Alice
	('Cleo', 5, 12.5, NULL, 'cat'),
	-- Cat without an owner
	('Ziggy', 3, 2.1, 7, 'reptile'),
	-- Reptile owned by Grace
	('Tiny', 1, 0.02, NULL, 'insect'),
	-- Insect without an owner
	('Milo', 4, 11.2, 8, 'dog'),
	-- Dog owned by Hannah
	('Bella', 5, 13.0, 8, 'dog'),
	-- Another Dog owned by Hannah
	('Simba', 2, 4.5, 9, 'cat'),
	-- Cat owned by Ian
	('Toto', 6, 7.3, NULL, 'dog'),
	-- Dog without an owner
	('Slinky', 3, 1.8, 10, 'reptile'),
	-- Reptile owned by Julia
	('Buzz', 2, 0.03, 6, 'insect');
	-- Insect owned by Frank