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

CREATE TABLE quizzes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    grammar_topic VARCHAR(50),
    cultural_topic VARCHAR(50),
    course VARCHAR(50),
    creator_id INTEGER,
    language VARCHAR(50),
    average_score DECIMAL(5, 2),
    parts JSON,
    total_submissions INTEGER,
    created_at TIMESTAMP,
    CONSTRAINT fk_creator
        FOREIGN KEY(creator_id)
            REFERENCES users(id)
);

CREATE TABLE parts(
    id SERIAL PRIMARY KEY,
    creator_id INTEGER,
    quiz_id INTEGER,
    quiz_pos INT,
    title VARCHAR(256),
    instructions VARCHAR(5000),
    average_score NUMERIC,
    total_responses INT,
    CONSTRAINT parts_fk_creator
        FOREIGN KEY (creator_id)
            REFERENCES users(id),
    CONSTRAINT parts_fk_quiz
        FOREIGN KEY (quiz_id)
            REFERENCES quizzes(id)
);

CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    creator_id INTEGER,
    quiz_id INTEGER,
    part_id INTEGER,
    part_pos INTEGER,
    language VARCHAR(255),
    grammarTopic VARCHAR(255),
    culturalTopic VARCHAR(255),
    quality_score INT,
    correct_responses INT,
    total_responses INTEGER,
    question_type VARCHAR(50),
    body JSON,
    CONSTRAINT fk_question_creator
        FOREIGN KEY(creator_id)
            REFERENCES users(id),
    CONSTRAINT question_fk_quiz
        FOREIGN KEY(quiz_id)
            REFERENCES quizzes(id),
    CONSTRAINT question_fk_part
        FOREIGN KEY(part_id)
            REFERENCES parts(id)
);

CREATE TABLE submissions(
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER,
    score DECIMAL(5, 2),
    taken_at TIMESTAMP,
    user_id INTEGER,
    responses JSON,
    CONSTRAINT assessments_fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id),
    CONSTRAINT assessments_fk_quiz
        FOREIGN KEY(quiz_id)
            REFERENCES quizzes(id)
);
