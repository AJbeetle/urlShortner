const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const url = new Schema({
    shortParam : {type : String, required:true, unique:true},
    shortId : {type : String, reuired : true, unique:true },
    redirectURL : {type:String, required:true},
    visitHistory : [{timestamp : {type : Number}}]
},{timestamps : true});

const urlModel = mongoose.model("urls",url);

module.exports = {
    urlModel
}