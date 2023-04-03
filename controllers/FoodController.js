const express = require("express");
const router = express.Router();
const db = require("../models/Database");
const data = require("../public/food");

function _foods(req, res){
    db.foods.find()
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    })
}

function _basket(req, res){
    res.render("food/basket");
}

router.get("/", _foods);
router.get("/basket", _basket);

module.exports = router;

