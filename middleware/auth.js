require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    console.log('auth token', token);
    //check for token
    if (!token) return res.status(401).json({ msg: 'no token, authorization denied'});

    //Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ msg: "Token is not valid"});
    }
}

module.exports = { auth };