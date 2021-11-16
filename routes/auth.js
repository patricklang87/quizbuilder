const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


// @route POST api/quth
// @desc Login user
// @access public
router.post("/", async (req, res, next) => {
        const { password, email } = req.body;

        //simple validation
        if (!email || !password ) {
            return res.status.apply(400).json({msg: 'Please enter all fields'});
        }

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (!user) {
            return res.status(400).json({msg: "Invalid credentials."})
        }
        bcrypt.compare(password, user.rows[0].password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.'});

                jwt.sign(
                    {id: user.id},
                    process.env.JWT_SECRET,
                    {expiresIn: 3600},
                    (err, token) => {
                        if (err) throw err;
                        delete user.rows[0].password;
                        res.json({
                            token,
                            user: user.rows[0]
                        });
                    }
                );

            });


});



module.exports = router;