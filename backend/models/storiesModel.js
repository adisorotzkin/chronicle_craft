const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret.js");

let storiesSchema = new mongoose.Schema({
    title:String,
    description:String,
    author:String,
    dateCreated:{ type: Date, default: Date.now() },
    dateUpdated:{ type: Date, default: Date.now() },
    publicStatus: boolean
})

exports.StoriesModel = mongoose.model("stories", storiesSchema);

exports.createToken = (_id) => {
    let token = jwt.sign({_id}, config.tokenSecret, {expiresIn: "60mins"});
    return token;
}

exports.validStory = (_reqBody) => {
    let joiSchema = joi.object({
        title: joi.string().min(2).max(99).required(),
        description: joi.string().min(2).max(999).email().required(),
        author: joi.string().min(6).max(99).required(),
        publicStatus: joi.boolean().required()
    })
    return joiSchema.validate(_reqBody);
}