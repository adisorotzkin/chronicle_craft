const mongoose = require("mongoose");
const joi = require("joi");

let ratingsSchema = new mongoose.Schema({
    author:String,
    rating:Number,
    dateRated:{ type: Date, default: Date.now()}
})

exports.RatingsModel = mongoose.model("ratings", ratingsSchema);

exports.validRating = (_reqBody) => {
    let joiSchema = joi.object({
        rating: joi.number().min(1).max(5).required()
    })
    return joiSchema.validate(_reqBody);
}