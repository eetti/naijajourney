const userCtrl = {}; // controller object
const bodyParser = require('body-parser');
const UserModel = require('../models/users.model');


userCtrl.create = async (req, res) => {
    const fn = 'create';
    console.log(`in ${fn} function;`)
    let email = null;
    let username = null;
    let fullName = null;
    if (req.body) {
        email = req.body.email;
        username = req.body.username;
        fullName = `${req.body.firstName} ${req.body.lastName}`;
        req.body["fullName"] = fullName;
    } else {
        res.status(400).send({ error: "Missing required data" });
        return;
    }
    UserModel.findByUsernameAndEmail(username, email).then((result, err) => {
        if (err) {
            console.log(err);
            res.status(400).send({ error: "Bad request" });
            return;
        }
        if (result.length == 0) {
            UserModel.create(req.body)
                .then((result) => {
                    res.status(201).send({
                        id: result._id
                    }).catch(e => {
                        res.status(400).send({
                            msg: e.toString()
                        });
                    });
                });
        } else {
            console.log("Found data with similar details");
            res.status(400).send({ error: "username not available" });
            return;
        }
    });

};

userCtrl.list = async (req, res) => {
    UserModel.list()
        .then((result) => {
            res.status(200).send(result);
        });
};

userCtrl.delete = async (req, res) => {
    UserModel.deleteById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        });
};

userCtrl.update = async (req, res) => {
    UserModel.patchById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        });
};

userCtrl.update = async (req, res) => {
    UserModel.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        });
};

module.exports = userCtrl;
// export default userCtrl;