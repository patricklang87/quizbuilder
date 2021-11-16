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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})