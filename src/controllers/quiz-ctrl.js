const quizCtrl = {}; // controller object
const bodyParser = require('body-parser');
const QuizModel = require('../models/quiz.model');


quizCtrl.create = async (req, res) => {
    const fn = 'quizCtrl.create()';
    console.log(`in ${fn} function;`)

    QuizModel.create(req.body)
        .then((result) => {
            res.status(201).send({
                id: result._id
            });
        }).catch(e => {
            res.status(400).send({
                msg: e.toString()
            });
        });

    console.log(`exit ${fn} function;`)
};

quizCtrl.list = async (req, res) => {
    QuizModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
};

quizCtrl.delete = async (req, res) => {
    QuizModel.deleteById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        });
};

quizCtrl.update = async (req, res) => {
    QuizModel.patchById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        }).catch(e => {
            res.status(400).send({
                msg: e.toString()
            });
        });
};

quizCtrl.findById = async (req, res) => {
    QuizModel.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        });
};

module.exports = quizCtrl;