const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret.js");

let paragraphsSchema = new mongoose.Schema({
    storyId:String,
    author:String,
    content:String,
    dateCreated:{ type: Date, default: Date.now() },
    dateUpdated:{ type: Date, default: Date.now() }
})

exports.ParagraphsModel = mongoose.model("paragraphs", paragraphsSchema);

exports.createToken = (_id) => {
    let token = jwt.sign({_id}, config.tokenSecret, {expiresIn: "60mins"});
    return token;
}

exports.validParagraph = (_reqBody) => {
    let joiSchema = joi.object({
        storyId: joi.string().min(2).max(99).required(),
        content: joi.string().min(2).max(999).email().required(),
        author: joi.string().min(6).max(99).required()
    })
    return joiSchema.validate(_reqBody);
}