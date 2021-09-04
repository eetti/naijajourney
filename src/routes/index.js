const express = require('express');

const router = express.Router();
const users = require('./users');
const quiz = require('./quiz');

router.get('/', (req, res) => {
    res.send(`Welcome to index route: ${req.hostname} REST-API`);
});


router.use('/api/v1/users', users);
router.use('/api/v1/quiz', quiz);

module.exports = router;