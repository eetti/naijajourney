const express = require('express');

const router = express.Router();
const quizCtrl = require('../controllers/quiz-ctrl');

/**
 * Routes for /quiz
 */
router.get('/', (req, res) => {
    res.send(`Welcome to : quiz routes :${req.hostname} REST-API`);
});


/**
 * This function comment is parsed by doctrine
 * @route POST /quiz/create
 * @group Quiz - create a new quiz
 * @operationId createQuiz
 * @param {Quiz.model} question.body.required - jsonObject - eg: {}
 * @returns {object} 200 - An array of quiz info
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', quizCtrl.create); // create a new quiz
/**
 * This function comment is parsed by doctrine
 * @route GET /quiz/list
 * @group Quiz - list available quizzes.
 * @operationId retrieveQuizzes
 * @returns {Array<Quiz>} 200 - An array of quiz info
 * @returns {Error}  default - Unexpected error
 */
router.get('/list', quizCtrl.list); // list quiz

module.exports = router;