const router = require('express').Router();
const pool = require('../db');
const { auth } = require('../middleware/auth');


// @route POST api/parts
// @desc add a  quiz part to the db
// @access private
router.post('/', auth, async (req, res) => {
    const { title, instructions, quiz_id, quiz_pos } = req.body;
    const creator_id = req.user.id;
    try {
        const newPart = await pool.query("INSERT INTO parts (creator_id, instructions, title, quiz_id, quiz_pos) VALUES($1, $2, $3, $4, $5) RETURNING *", [creator_id, instructions, title, quiz_id, quiz_pos]);

        res.json(newPart.rows[0]);

    } catch (error) {
        console.log(error);
    }
});

// @route PUT api/parts
// @desc update quiz title or instructions
// @access private
router.put('/', auth, async (req, res) => {
    const { title, instructions, part_id } = req.body;
    try {
        const updatedPart = await pool.query("UPDATE parts SET title = $1, instructions = $2 WHERE id = $3 RETURNING *", [title, instructions, part_id]);
        res.json(updatedPart.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

// @route DELETE api/parts
// @desc DELETE quiz part
// @access private
router.delete('/:partId', auth, async (req, res) => {
    const part_id = req.params.partId;
    console.log("partid", part_id)
    const creator_id = req.user.id;
    try {
        const questionsUpdate = await pool.query("UPDATE questions SET part_id = NULL WHERE part_id = $1 AND creator_id = $2", [part_id, creator_id]);
        const deletedPart = await pool.query("DELETE FROM parts WHERE id = $1 AND creator_id = $2", [part_id, creator_id]);
        res.json(deletedPart.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

// @route GET api/parts/:quizid
// @desc get quiz parts and questions for a certain quiz
// @access private
router.get('/:quizId', auth, async (req, res) => {
 
    const quiz_id = req.params.quizId;
    const creator_id = req.user.id;
     try {
         const parts = await pool.query("SELECT * FROM parts WHERE quiz_id = $1 AND creator_id = $2", [quiz_id, creator_id]);
         const questions = await pool.query("SELECT * FROM questions WHERE quiz_id = $1 AND creator_id = $2", [quiz_id, creator_id]);
         const data = {parts: parts.rows, questions: questions.rows};
         res.json(data);
     } catch (error) {
         console.log(error);
     }
});

// @route GET api/parts/takeQuiz/:id
// @desc get parts and questions for a specific quiz from the DB, leaving out correct answers
// @access public
router.get('/takeQuiz/:id', async (req, res) => {
    try {
        const quiz_id = req.params.id;
        const parts = await pool.query("SELECT * FROM parts WHERE quiz_id = $1", [quiz_id]);
        const questions = await pool.query("SELECT * FROM questions WHERE quiz_id = $1", [quiz_id]);
        const questionsNoAnswer = questions.rows.map(question => {
            question.body.responses.forEach(res => {
                delete res.correct;
                if (question.question_type === "FB") {
                    delete res.text;
                }
            });
            return question;
        });
        res.json({parts: parts.rows, questions: questionsNoAnswer})
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;