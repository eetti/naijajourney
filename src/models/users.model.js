const Mongoose = require('mongoose');
const Config = require('../config/env.config');

const MONGODB_URI = Config.mongoDbUri;

Mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Schema = Mongoose.Schema;

/**
 * @typedef User
 * @property {string} username
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} fullName
 * @property {string} email
 * @property {string} status
 * @property {string} avatarUrl
 */
const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    fullName: String,
    createdAt: String,
    email: String,
    status: String,
    avatarUrl: String
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('User').find({
        id: this.id
    }, cb);
};

const User = Mongoose.model('user', userSchema);

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            if (result) {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        });
};

exports.create = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchById = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, user) {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })
};

exports.deleteById = (id) => {
    return new Promise((resolve, reject) => {
        User.deleteOne({
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

exports.findByUsernameAndEmail = (username, email) => {
    return User.find({
        username: username,
        email: email
    });
};