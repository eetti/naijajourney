const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 12;
const { from, EMPTY } = require("rxjs");
const { map, mergeMap } = require("rxjs/operators");

const hashPassword = (password, saltRounds) =>
    mergeMap(_ => from(bcrypt.hash(password, saltRounds)));

const addPasswordHashToUser = userObj =>
    map(hash => ({ ...userObj, passwordHash: hash }));

const comparePassword = pwd =>
    mergeMap(user => from(bcrypt.compare(pwd, user.passwordHash)));

const addUser = collection =>
    mergeMap(user => from(insertUser(collection, user)));

router.post("/authenticate", (req, res)=>{
    const username = req.body.username || null;
    const password = req.body.password || null;

    const validUsername = username.match(/^[a-zA-Z]+$/);
    res.status(200).send("Welcome to WestWorld.")

    /* if(!!validUsername && password) {
        const auth$ = from(finduserByUsername(usersColl, username)).pipe(
            retrieveUser,
            comparePassword(password)
        );

        const next = authValid =>
            authValid
                ? res.status(200).send("Welcome to WestWorld.")
                : res.status(401).send("Wrong email or password.");

        const error = err => {
            // integrate a mechanism to log errors
            res.status(500).send("Wrong email or password.");
        };

        auth$.subscribe(next, error);
    } else {
        res.status(401).send("Wrong email or password.");
    } */
});

export default router;