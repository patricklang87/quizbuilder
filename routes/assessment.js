const router = require('express').Router();
const pool = require('../db');
const { auth } = require('../middleware/auth');


const updateQuestionTotals = async (newQuestionTotal, newCorrectTotal, id) => {
    const update = await pool.query("UPDATE questions SET total_responses = $1, correct_responses = $2 WHERE id = $3", [newQuestionTotal, newCorrectTotal, id]);
}

// @route POST api/assessment
// @desc grade a submitted quiz
// @access private
router.post('/', auth, async (req, res) => {
    try {
        const submission = req.body;
        const user_id = req.user.id;
        const quiz_id = submission[0].quiz_id;
        const questions = await pool.query("SELECT * FROM questions WHERE quiz_id = $1", [quiz_id]);
        const results = {}
        let score = 0

        //score the submission
        // submission.forEach(res => {
        for (let res of submission) {
            const subQuestionId = res.id;
            const key = questions.rows.filter(ques => {
                return ques.id === subQuestionId
            })[0];

            console.log(key);

            let mark;

            const acceptableResponses = key.body.responses.filter(res => {
                return res.correct === true
            }).map(res => {
                return res.text;
            });

            if (key.question_type === "FB" || key.question_type === "MC") {
                mark = acceptableResponses.includes(res.response);
            } else {
                mark = acceptableResponses[0] === res.response;
            }
            if (mark === true) score++;
            results[res.id] = {
                mark,
                res: res.response,
                key: acceptableResponses
            }

            //update question totals

            let newQuestionTotal, newCorrectTotal;
            if (key.total_responses == null) {
                newQuestionTotal = 1;
                newCorrectTotal = (mark) ? 1 : 0
            } else {
                newQuestionTotal = key.total_responses + 1;
                newCorrectTotal = (mark === true) ? key.correct_responses + 1 : key.correct_responses;
            }

            const dontWorry = await updateQuestionTotals(newQuestionTotal, newCorrectTotal, key.id);

        };
        
        // update total quiz submissions and quiz average
        const percentage = Math.round((score / submission.length) * 10000) / 100;
        const timestamp = new Date();
        let newAverage, newTotalSubmissions;

        const avgAndTotal= await pool.query("SELECT average_score, total_submissions FROM quizzes WHERE id = $1", [quiz_id]);
        const { average_score, total_submissions } = avgAndTotal.rows[0];

        if (total_submissions == null) {
            newAverage = percentage;
            newTotalSubmissions = 1;
        } else {
            newAverage = (average_score * total_submissions + percentage) / (total_submissions + 1);
            newTotalSubmissions = total_submissions + 1;
        }
        
        const updatedAvg = await pool.query("UPDATE quizzes SET average_score = $1, total_submissions = $2 WHERE id = $3", [newAverage, newTotalSubmissions, quiz_id]);

        //add submission to submission table and return results
        const response = await pool.query("INSERT INTO submissions (quiz_id, score, taken_at, user_id, responses) VALUES($1, $2, $3, $4, $5) RETURNING *", [quiz_id, percentage, timestamp, user_id, results]);
        res.json(response.rows[0]);



    } catch (error) {
        console.log(error);
    }
});

// @route GET api/assessment
// @desc get assessments for a single user
// @access private
router.get('/', auth, async (req, res) => {
    const user_id = req.user.id;
    try {
        // pool.query("SELECT quizzes.*, users.first_name, users.last_name FROM quizzes LEFT JOIN users ON users.id = quizzes.creator_id");

        const response = await pool.query('SELECT submissions.*, quizzes.title, quizzes.course, quizzes.cultural_topic, quizzes.language, users.first_name, users.last_name FROM submissions LEFT JOIN quizzes ON quizzes.id = submissions.quiz_id LEFT JOIN users ON users.id = quizzes.creator_id WHERE submissions.user_id = $1 ', [user_id]);
        res.json(response.rows);
    } catch (error) {
        console.log(error);
    }
});

// @route GET api/assessments/singleResult
// @desc get result for a single assessment
// @access private
router.get('/:id', auth, async (req, res) => {
    const assessment_id = req.params.id;
    const assessmentInfo = await pool.query('Select * FROM submissions WHERE id = $1', [assessment_id]);
    const questionIds = Object.keys(assessmentInfo.rows[0].responses);
    const questionData = await pool.query('SELECT * FROM questions WHERE id = ANY($1)', [questionIds]);
    const questions = questionData.rows;
    const quizId = questions[0].quiz_id;
    const partIds = new Set();
    questions.forEach(question => partIds.add(question.part_id));
    const partsData = await pool.query('SELECT * FROM parts WHERE id = ANY($1)', [partIds]);
    const quizData = await pool.query('SELECT * FROM quizzes WHERE id = $1', [quizId]);
    const data = {
        questions,
        parts: partsData.rows,
        quiz: quizData.rows
    }
    res.json(data);
});


module.exports = router;