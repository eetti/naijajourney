const express = require('express');

const router = express.Router();
const usersCtrl = require('../controllers/users-ctrl');

/**
 * Routes for /users
 */
router.get('/', (req, res) => {
    res.send(`Welcome to : users routes :${req.hostname} REST-API`);
});

/**
 * @typedef User
 * @property {string} username
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /users/create
 * @group Users - create a new user
 * @operationId createUser
 * @param {User.model} user.body.required - jsonObject - eg: user@domain
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', usersCtrl.create); // register a new users with the org
/**
 * This function comment is parsed by doctrine
 * @route GET /users/list
 * @group Users - list available users.
 * @operationId retrieveUsers
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/list', usersCtrl.list); // list users

module.exports = router;