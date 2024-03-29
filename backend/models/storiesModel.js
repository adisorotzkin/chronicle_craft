const mongoose = require("mongoose");
const joi = require("joi");

let storiesSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    dateCreated: { type: Date, default: Date.now() },
    charactersCtr: { type: Number, default: 0 },
    paragraphsArr: Array,
    coverImg: String,
    genre: String
})

exports.StoriesModel = mongoose.model("stories", storiesSchema);

exports.validStory = (_reqBody) => {
    let joiSchema = joi.object({
        title: joi.string().min(2).max(99).required(),
        description: joi.string().min(2).max(999).required(),
        genre: joi.string(),
        coverImg: joi.string().allow(""),
        paragraphsArr: joi.array().items(joi.string()).optional()
    })
    return joiSchema.validate(_reqBody);
}

exports.validEditStory = (_reqBody) => {
    let joiSchema = joi.object({
        charactersCtr: joi.number().min(0).max(5),
        paragraphsArr: joi.array()
    })
    return joiSchema.validate(_reqBody);
}