const mongoose = require("mongoose");
const joi = require("joi");

let paragraphsSchema = new mongoose.Schema({
    storyId:String,
    author:String,
    name:String,
    content:String,
    end: Boolean,
    dateCreated:{ type: Date, default: Date.now() }
})

exports.ParagraphsModel = mongoose.model("paragraphs", paragraphsSchema);

exports.validParagraph = (_reqBody) => {
    let joiSchema = joi.object({
        storyId: joi.string(),
        name: joi.string(),
        content: joi.string().min(2).max(999).required(),
        end: joi.boolean()
    })
    return joiSchema.validate(_reqBody);
}

exports.validParaEdit = (_reqBody) => {
    let joiSchema = joi.object({
        name: joi.string().min(2).max(99),
        content: joi.string().min(2).max(999)
    }); 

    return joiSchema.validate(_reqBody);
};