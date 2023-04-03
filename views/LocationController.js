const express = require("express");
const router = express.Router();
const db = require("../models/Database");

function _list(req, res){
    res.render("locations/locations")
}

function _ilList(req, res){
    db.il.find().sort({"plaka" : 1})
    .then(result => {
        res.json(result);
    }).catch(err => {res.json("")})
}

async function _ilKayit(req, res){
    let id;
    if(!req.body.id) id = await getId("il") + 1;
    else id = Number(req.body.id);

    const _il = new db.il({
        id: id,
        plaka: req.body.plaka,
        adi: req.body.adi
    });

    _il.save(function(err, result){
        if(err) { console.log(err)};
        res.json(result)
    })
}

function _topluKayit(req, res){
    let data = eval(req.body.arr);
    let db = req.body.db;

    if(db == "0") db = db.il;
    if(db == "1") db = db.ilce;
    if(db == "2") db = db.semt;
    if(db == "3") db = db.mahalle;
    
    db.insertMany(data)
    .then(result => res.json(result))
    .catch(err => {
        console.log(err);
        res.json(err);
    });
}

function _ilceList(req, res){
    let condition = req.params;
    if(req.params.il <= 0) condition = {}

    db.ilce.find(condition).sort({"id" : 1})
    .then(result => {
        res.json(result);
    }).catch(err => {res.json("")})
}

async function _ilceKayit(req, res){
    let id;
    if(!req.body.id) id = await getId("ilce") + 1;
    else id = Number(req.body.id);

    const _ilce = new db.ilce({
        id: id,
        il: req.body.il,
        adi: req.body.adi
    });

    _ilce.save(function(err, result){
        if(err) { console.log(err)};
        res.json(result)
    })
}

function _semtList(req, res){
    let condition = req.params;
    if(req.params.ilce <= 0) condition = {}
    db.semt.find(condition).sort({"id" : 1})
    .then(result => {
        res.json(result);
    }).catch(err => {res.json("")})
}

async function _semtKayit(req, res){
    let id;
    if(!req.body.id) id = await getId("semt") + 1;
    else id = Number(req.body.id);

    const _semt = new db.semt({
        id: id,
        il: req.body.il,
        ilce: req.body.ilce,
        adi: req.body.adi,
        postakodu: req.body.postakodu
    });

    _semt.save(function(err, result){
        if(err) { console.log(err)};
        res.json(result)
    })
}

function _mahalleList(req, res){
    let condition = req.params;
    if(req.params.semt <= 0) condition = {}

    db.mahalle.find(condition).sort({"id" : 1})
    .then(result => {
        res.json(result);
    }).catch(err => {res.json("")})
}

async function _mahalleKayit(req, res){
    let id;
    if(!req.body.id) id = await getId("mahalle") + 1;
    else id = Number(req.body.id);

    const _mahalle = new db.mahalle({
        id: id,
        il: req.body.il,
        ilce: req.body.ilce,
        semt: req.body.semt,
        adi: req.body.adi
    });

    _mahalle.save(function(err, result){
        if(err) { console.log(err)};
        res.json(result)
    })
}

router.get("/", _list);
router.get("/iller", _ilList);
router.post("/iller", _ilKayit);
router.get("/ilceler/:il", _ilceList);
router.post("/ilceler", _ilceKayit);
router.get("/semtler/:ilce", _semtList);
router.post("/semtler", _semtKayit);
router.get("/mahalleler/:semt", _mahalleList);
router.post("/mahalleler", _mahalleKayit);
router.post("/importfile", _topluKayit);

module.exports = router;


async function getId(_table){
    let id = 0;
    await db[_table].find({}).sort({"id" : 1})
    .then(result => {
        id = result[result.length - 1].id;
    })
    .catch(err =>{console.log(err)});
    return(id);
};