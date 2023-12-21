const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret.js");

let ratingsSchema = new mongoose.Schema({
    userId:String,
    authorId:String,
    rating:Number,
    dateRated:{ type: Date, default: Date.now()}
})

exports.RatingsModel = mongoose.model("ratings", ratingsSchema);

exports.createToken = (_id) => {
    let token = jwt.sign({_id}, config.tokenSecret, {expiresIn: "60mins"});
    return token;
}

exports.validRating = (_reqBody) => {
    let joiSchema = joi.object({
        userId: joi.string().min(6).max(99).required(),
        authoId: joi.string().min(6).max(99).required(),
        rating: joi.number().min(1).max(5).required()
    })
    return joiSchema.validate(_reqBody);
}