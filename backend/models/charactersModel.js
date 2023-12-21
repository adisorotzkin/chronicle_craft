const mongoose = require("mongoose");
const joi = require("joi");

let charactersSchema = new mongoose.Schema({
    storyId:String,
    author:String,
    characterName:String,
    image:String,
    description:String,
    traits: Array
})

exports.CharactersModel = mongoose.model("characters", charactersSchema);


exports.validCharacter = (_reqBody) => {
    let joiSchema = joi.object({
        storyId: joi.string().required(),
        author: joi.string().required(),
        characterName: joi.string().min(6).max(99).required(),
        image: joi.string().min(6).max(99).required(),
        description: joi.string().min(6).max(99).required()
    })
    return joiSchema.validate(_reqBody);
}
