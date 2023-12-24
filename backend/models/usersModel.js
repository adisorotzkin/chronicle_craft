const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret.js");

let usersSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    registrationDate:{ type: Date, default: Date.now()},
    profilePicture:String,
    bio:String,
    dateOfBirth: Date,
    role:{ type: String, default: "user"},
    active: { type: Boolean, default: true },
    rating: Number
})

exports.UsersModel = mongoose.model("users", usersSchema);

exports.createToken = (_id) => {
    let token = jwt.sign({_id}, config.tokenSecret, {expiresIn: "60mins"});
    return token;
}

exports.validUser = (_reqBody) => {
    let joiSchema = joi.object({
        username: joi.string().min(2).max(99).required(),
        email: joi.string().min(2).max(99).email().required(),
        password: joi.string().min(6).max(30).required(),
        dateOfBirth: joi.date().required().min(new Date().getFullYear() - 120).max(new Date().getFullYear() - 8)
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