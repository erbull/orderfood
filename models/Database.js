const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
    username: {type:String, require:true, unique:true},
    name: {type:String, require:true},
    lastname: {type:String, require:true},
    password: {type:String, require:true}
}, {timestamp: true});

const foodSchema = new schema({
    name: {type:String},
    type: {type:Number},
    image: {type:String},
    description: {type:String},
    price: {type:Number}
});

const user = mongoose.model("user", userSchema);
const food = mongoose.model("food", foodSchema);

module.exports.users = user;
module.exports.foods = food;