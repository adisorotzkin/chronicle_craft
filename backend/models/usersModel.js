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
    rating:  { type: Number, default: 0 }
})

exports.UsersModel = mongoose.model("users", usersSchema);

exports.createToken = (_id, role) => 
{
    let token = jwt.sign({ _id, role }, config.tokenSecret, { expiresIn: "60mins" });
    return token;
}

exports.validUser = (_reqBody) => {
    let joiSchema = joi.object({
        username: joi.string().min(2).max(99).required(),
        email: joi.string().min(2).max(99).email().required(),
        bio: joi.string().min(2).max(999).allow(""),
        profilePicture:joi.string().allow(""),
        password: joi.string().min(6).max(30).required(),
        dateOfBirth: joi.date().allow("")
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