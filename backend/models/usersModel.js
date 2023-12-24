const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret.js");

let usersSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    registrationDate:{ type: Date, default: Date.now()},
    profilePicture:String,
    bio:String,
    dateOfBirth: Date,
    role:{ type: String, default: "user"},
    active: boolean,
    rating:Number
})

exports.UsersModel = mongoose.model("users", usersSchema);

exports.createToken = (_id) => {
    let token = jwt.sign({_id}, config.tokenSecret, {expiresIn: "60mins"});
    return token;
}

exports.validUser = (_reqBody) => {
    let joiSchema = joi.object({
        name: joi.string().min(2).max(99).required(),
        email: joi.string().min(2).max(99).email().required(),
        password: joi.string().min(6).max(99).required(),
        dateOfBirth: joi.date().required(),
    })
    return joiSchema.validate(_reqBody);
}

exports.validLogin = (_reqBody) => {
    let joiSchema = joi.object({
        email: joi.string().min(2).max(99).email().required(),
        password: joi.string().min(6).max(99).required()
    })
    return joiSchema.validate(_reqBody);
}