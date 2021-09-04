const Mongoose = require('mongoose');
const Config = require('../config/env.config');
const { v4: uuidv4 } = require('uuid');

const MONGODB_URI = Config.mongoDbUri;

Mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Schema = Mongoose.Schema;

/**
 * @typedef options
 * @property {string} optionText  - eg: Run
 * @property {boolean} isCorrect
 */
const optionsSchema = new Schema({
    optionText: String,
    isCorrect: Boolean 
});

/**
 * @typedef Quiz
 * @property {string} questionText
 * @property {Array<options>} options
 * @property {integer} marks
 * @property {integer} difficultyLevel
 * @property {enum} questionType - eg: teaser,quick
 * @property {Array.<integer>} correctOptions
 * {Date} addedAt
 * {Date} updatedAt
 */
const quizSchema = new Schema({
    questionId: String,
    questionText: {type: String, required: true, unique: true},
    options: {type: Array, required: true},
    marks: {type: Number, required: true },
    difficultyLevel: {type: Number},
    questionType: {type: String, required: true},
    correctOptions: {type: Array, required: true},
    addedAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

quizSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
quizSchema.set('toJSON', {
    virtuals: true
});

quizSchema.findById = function (cb) {
    return this.model('Quiz').find({
        id: this.id
    }, cb);
};

const Quiz = Mongoose.model('Quiz', quizSchema);

exports.findById = (id) => {
    return Quiz.findById(id)
        .then((result) => {
            if (result) {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        });
};

exports.create = (quizData) => {
    quizData["questionId"] = `Q_${uuidv4()}`;
    const quiz = new Quiz(quizData);
    return quiz.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        Quiz.find()
            .exec(function (err, quizzes) {
                if (err) {
                    reject(err);
                } else {
                    resolve(quizzes);
                }
            })
    });
};

exports.patchById = (id, quizData) => {
    return new Promise((resolve, reject) => {
        Quiz.findById(id, function (err, quiz) {
            if (err) reject(err);
            for (let i in quizData) {
                quiz[i] = quizData[i];
            }
            quiz.save(function (err, updatedQuiz) {
                if (err) return reject(err);
                resolve(updatedQuiz);
            });
        });
    })
};

exports.deleteById = (id) => {
    return new Promise((resolve, reject) => {
        Quiz.deleteOne({
            _id: id
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
