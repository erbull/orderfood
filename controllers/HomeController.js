const express = require("express");
const router = express.Router();
const db = require("../models/Database");

function _home(req, res){
    db.foods.find({})
    .then(result => {
        res.render("index", {
            data: result
        });
    })
    .catch(err => {
        res.render("index");
    })
}

router.get("/", _home);

module.exports = router;