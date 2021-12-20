const router = require('express').Router();
const { response } = require('express');
const pool = require('../db');
const { auth } = require('../middleware/auth');

// id SERIAL PRIMARY KEY,
// creator_id INTEGER,
// quiz_id INTEGER,
// part_id INTEGER,
// language INT,
// quality_score INT,
// success_rate INT,
// total_responses INTEGER,
// question_type VARCHAR(50),
// body JSON,


// @route POST api/questions
// @desc add a question to the db
// @access private
router.post('/', auth, async (req, res) => {
    const {quizId, part_id, language, grammarTopic, culturalTopic, questionType, responses, questionText, part_pos} = req.body;
    const creator_id = req.user.id;
    const body = {questionText, responses}
    try {
        const newQuestion = await pool.query("INSERT INTO questions (creator_id, quiz_id, part_id, language, question_type, body, grammarTopic, culturalTopic, part_pos) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [creator_id, quizId, part_id, language, questionType, body, grammarTopic, culturalTopic, part_pos]);
        res.json(newQuestion.rows[0]);

    } catch (error) {
        console.log(error);
    }
});

// @route PUT api/questions
// @desc update a question in the DB
// @access private
router.put('/', auth, async (req, res) => {
    const {questionText, responses, questionId} = req.body;
    console.log(req.body);
    const body = {questionText, responses};
    const creator_id = req.user.id;
    try {
        const updatedQuestion = await pool.query('UPDATE questions SET body = $1 WHERE creator_id = $2 AND id = $3 RETURNING *', [body, creator_id, questionId]);
        res.json(updatedQuestion.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

// @route GET api/questions
// @desc get all a users questions from the db
// @access private
router.get('/', auth, async (req, res) => {
    const creator_id = req.user.id;
    try {
        const response = await pool.query("SELECT * FROM questions WHERE creator_id = $1", [creator_id]);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}); 

// @route DELETE api/questions
// @desc delete a question 
// @access private
router.delete('/:id', auth, async (req, res) => {
    const question_id = req.params.id;
    const creator_id = req.user.id
    try {
        const response = await pool.query("DELETE FROM questions WHERE creator_id = $1 AND id = $2", [creator_id, question_id]);
        res.json(response);
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
