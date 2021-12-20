const router = require('express').Router();
const pool = require('../db');
const { auth } = require('../middleware/auth');

// @route POST api/quiz
// @desc add a quiz to the db
// @access private
router.post('/', auth, async (req, res) => {
    const {title, language, grammarTopic, culturalTopic, course } = req.body;
    const creator_id = req.user.id;
    const created_at = new Date();
    try {
        const newQuiz = await pool.query("INSERT INTO quizzes (creator_id, title, language, grammar_topic, cultural_topic, course, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [creator_id, title, language, grammarTopic, culturalTopic, course, created_at]);
        res.json(newQuiz.rows[0]);

    } catch (error) {
        console.log(error);
    }
});

// @route GET api/quiz
// @desc get one entire quiz for editing
// @access private
router.get('/getQuiz/:id', auth, async (req, res) => {
    const quiz_id = req.params.id;
    const creator_id = req.user.id;
    try {
        const quiz = await pool.query("SELECT * FROM quizzes WHERE id = $1 AND creator_id = $2 ", [quiz_id, creator_id]);
        const parts = await pool.query("SELECT * FROM parts WHERE quiz_id = $1", [quiz_id]);
        const questions = await pool.query("SELECT * FROM questions WHERE quiz_id = $1", [quiz_id]);

        const quizComponents = {
            quiz: quiz.rows[0],
            parts: parts.rows,
            questions: questions.rows
        }

        res.json(quizComponents);

    } catch (error) {
        console.log(error);
    }
});

// @route DELETE api/quiz
// @desc delete a quiz based on quizId
// @access private
router.delete('/:id', auth, async (req, res) => {
    const creator_id = req.user.id;
    const quiz_id = req.params.id;
    try {
        const questionsUpdate = await pool.query("UPDATE questions SET quiz_id = NULL WHERE quiz_id = $1 AND creator_id = $2", [quiz_id, creator_id]);
        const partsUpdate = await pool.query("UPDATE parts SET quiz_id = NULL WHERE quiz_id = $1 AND creator_id = $2", [quiz_id, creator_id]);
        const response = await pool.query("DELETE FROM quizzes WHERE creator_id = $1 AND id = $2", [creator_id, quiz_id]);
        console.log(response);
        res.json(response.rows[0]);
    } catch (error) {
        console.log(error);
    }
})

// @route GET api/quiz/designed
// @desc get user's quizzes from the db
// @access private
router.get('/designed', auth, async (req, res) => {
    const creator_id = req.user.id;
    const quizzes_designed = await pool.query("SELECT * FROM quizzes WHERE creator_id = $1", [creator_id]);
    res.json(quizzes_designed.rows);
});

// @route GET api/quiz/all
// @desc get all quizzes from the DB
// @access public
router.get('/all', async (req, res) => {
    try {
        const quizzes = await pool.query("SELECT quizzes.*, users.first_name, users.last_name FROM quizzes LEFT JOIN users ON users.id = quizzes.creator_id");
        res.json(quizzes.rows);
    } catch (error) {
        console.log(error);
    } 
});

module.exports = router;