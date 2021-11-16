CREATE DATABASE quizbuilder;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(300),
    email VARCHAR(50) UNIQUE,
    questions integer [],
    classes_teacher integer [],
    classes_student integer [],
    quizzes_designed integer [],
    quizzes_taken integer [],
    institution integer []
);

CREATE TABLE questions(
id SERIAL PRIMARY KEY,
creator_id INTEGER,
language_id INTEGER,
subjective_difficulty integer,
quality_score INT,
success_rate INT,
total_responses INTEGER,
body JSON,
CONSTRAINT fk_creator
    FOREIGN KEY(creator_id)
        REFERENCES users(id)
);