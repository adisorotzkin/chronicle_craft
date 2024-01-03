const mongoose = require("mongoose");
const joi = require("joi");

let charactersSchema = new mongoose.Schema({
    storyId:String,
    author:String,
    characterName:String,
    image:String,
    description:String
})

exports.CharactersModel = mongoose.model("characters", charactersSchema);

exports.validCharacter = (_reqBody) => {
    let joiSchema = joi.object({
        storyId: joi.string(),
        characterName: joi.string().min(2).max(99).required(),
        description: joi.string().min(2).max(2000).required(),
        image: joi.string()
    })
    return joiSchema.validate(_reqBody);
}
