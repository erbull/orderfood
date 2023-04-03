const express = require("express");
const router = express.Router();
const db = require("../models/Database");
const crypto = require("crypto");

function _user(req, res){
    res.render("user/user");
}

function _signup(req, res){
    res.render("user/signup");
}

function _postSignup(req, res){
    const user = new db.users({
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        password: crypt(req.body.password)
    });

    user.save()
    .then(result => {
        req.session.user = {
            username: result.username,
            name: result.name,
            lastname: result.lastname,
        }
        res.redirect("/");
    })
    .catch(err => {
        console.log(err);
        res.render("user/signup", {
            error: req.body,
            errorcode: err.code
        });
    })
}

function _login(req, res){
    res.render("user/login");
}

function _postLogin(req, res){
    const {username, password} = req.body;
    db.users.findOne({username: username, password: crypt(password)})
    .then(result => {

        req.session.username= result.username;
        req.session.name= result.name;
        req.session.lastname= result.lastname;

        res.redirect("/");
    })
    .catch(err => {
        res.render("user/login", {
            error: true
        });
    });
}

function _logout(req, res){
    res.render("user/logout");
}

router.get("/", _user);
router.get("/login", _login);
router.post("/login", _postLogin);
router.get("/logout", _logout);
router.get("/signup", _signup);
router.post("/signup", _postSignup);

module.exports = router;

function crypt(data){
    hash = crypto.getHashes();
    const hashPwd = crypto.createHash('sha1').update(data).digest('hex');
    return hashPwd;
}