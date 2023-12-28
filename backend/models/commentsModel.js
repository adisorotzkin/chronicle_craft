const mongoose = require("mongoose");
const joi = require("joi");

let commentsSchema = new mongoose.Schema({
    userId:String,
    paragraphId:String,
    dateCreated:{ type: Date, default: Date.now() },
    content: String
})

exports.CommentsModel = mongoose.model("comments", commentsSchema);

exports.validComment = (_reqBody) => {
    let joiSchema = joi.object({
        paragraphId:joi.string().allow(""),
        content: joi.string().min(2).max(999).required()
    })
    return joiSchema.validate(_reqBody);
}