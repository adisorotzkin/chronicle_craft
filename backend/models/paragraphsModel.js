const mongoose = require("mongoose");
const joi = require("joi");

let paragraphsSchema = new mongoose.Schema({
    storyId:String,
    author:String,
    content:String,
    end: {type: Boolean, default: false},
    dateCreated:{ type: Date, default: Date.now() }
})

exports.ParagraphsModel = mongoose.model("paragraphs", paragraphsSchema);

exports.validParagraph = (_reqBody) => {
    let joiSchema = joi.object({
        content: joi.string().min(2).max(999).email().required(),
        end: joi.boolean()
    })
    return joiSchema.validate(_reqBody);
}