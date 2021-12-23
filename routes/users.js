const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');


// @route POST api/users
// @desc Register new user
// @access public
router.post("/", async (req, res, next) => {
    try {
        console.log("t1", new Date())
        const { first_name, last_name, password, email } = req.body;

        //simple validation
        if (!first_name || !last_name || !email || !password ) {
            return res.status.apply(400).json({msg: 'Please enter all fields'});
        }

        // Create salt & hash
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        console.log("t2", new Date());
        const newUser = await pool.query("INSERT INTO users (first_name, last_name, password, email) VALUES($1, $2, $3, $4) RETURNING *", [first_name, last_name, hashedPassword, email]);

        res.json(newUser.rows[0]);
    } catch (error) {
        console.log(error.message);
        if (error.constraint === "users_email_key") {
            res.json({msg: 'An account is already associated with the email address.'})
        }
    }
});

router.get('/', (req, res) => {
    res.send('So many users!');
})

module.exports = router;