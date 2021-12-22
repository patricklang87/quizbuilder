//Provisioning a Heroku database: https://devcenter.heroku.com/articles/heroku-postgresql

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const path = require('path');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/parts', require('./routes/parts'));
app.use('/api/assessment', require('./routes/assessment'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})