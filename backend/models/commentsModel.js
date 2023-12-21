const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret.js");

let commentsSchema = new mongoose.Schema({
    userId:String,
    stroyId:String,
    paragraphId:String,
    dateCreated:{ type: Date, default: Date.now() },
    content: String
})

exports.CommentsModel = mongoose.model("comments", commentsSchema);

exports.createToken = (_id) => {
    let token = jwt.sign({_id}, config.tokenSecret, {expiresIn: "60mins"});
    return token;
}

exports.validComment = (_reqBody) => {
    let joiSchema = joi.object({
        userId: joi.string().min(6).max(99).required(),
        storyId: joi.string().min(6).max(99).required(),
        paragraphId: joi.string().min(6).max(99).required(),
        content: joi.string().min(2).max(999).required(),
    })
    return joiSchema.validate(_reqBody);
}