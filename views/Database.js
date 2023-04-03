const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {type: String, require:true, unique: true},
    name: {type: String, require:true},
    lastname: {type: String, require:true},
    il: {type: Number},
    ilce: {type: Number},
    semt: {type: Number},
    mahalle: {type: Number},
    adres: {type: String},
    password: {type: String, require:true}
}, {timestamps: true});

const adressSchema = new schema({
    username: {type: String, require:true},
    il: {type: Number, require:true},
    ilce: {type: Number, require:true},
    semt: {type: Number, require:true},
    mahalle: {type: Number, require:true},
    adress: {type: String, require:true}
});

const provinceSchema = new schema({
    id: {type: Number, require:true, unique:true},
    adi: {type: String, require:true},
    plaka: {type: String, require:true, unique: true}
});

const districtSchema = new schema({
    id: {type: Number, require:true, unique:true},
    il: {type: Number, require:true},
    adi: {type: String, require:true}
});

const centralSchema = new schema({
    id: {type: Number, require:true, unique:true},
    il: {type: Number, require:true},
    ilce: {type: Number, require:true},
    adi: {type: String, require:true},
    postakodu: {type: String, require:true}
});

const neighbourhoodSchema = new schema({
    id: {type: Number, require:true, unique:true},
    il: {type: Number, require:true},
    ilce: {type: Number, require:true},
    semt: {type: Number, require:true},
    adi: {type: String, require:true}
});

const questionSchema = new schema({
    lesson: {type: Number, require:true},
    unit: {type: Number, require:true},
    level: {type: Number, require:true},
    type: {type: Number, require:true},
    question: {type: String, require:true},
    answers: {type: Array, require:true},
    answer: {type: Number, require:true},
    scoring: {type: Number, require:true},
    time: {type: Number, require:true}
});

const user = mongoose.model("user", userSchema)
const provinces = mongoose.model("province", provinceSchema);
const districts = mongoose.model("district", districtSchema);
const centrals = mongoose.model("central", centralSchema);
const neighbourhoods = mongoose.model("neighbourhood", neighbourhoodSchema);
const questions = mongoose.model("question", questionSchema);

module.exports.users = user;
module.exports.provinces = provinces;
module.exports.districts = districts;
module.exports.centrals = centrals;
module.exports.neighbourhoods = neighbourhoods;
module.exports.questions = questions;