const mongoose = require("mongoose");
const joi = require("joi");

let storiesSchema = new mongoose.Schema({
    title:String,
    description:String,
    author:String,
    dateCreated:{ type: Date, default: Date.now() },
    dateUpdated:{ type: Date, default: Date.now() }
})

exports.StoriesModel = mongoose.model("stories", storiesSchema);

exports.validStory = (_reqBody) => {
    let joiSchema = joi.object({
        title: joi.string().min(2).max(99).required(),
        description: joi.string().min(2).max(999).email().required(),
        author: joi.string().min(6).max(99).required()
    })
    return joiSchema.validate(_reqBody);
}