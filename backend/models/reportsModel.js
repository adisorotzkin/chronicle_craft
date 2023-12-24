const mongoose = require("mongoose");
const joi = require("joi");

let reportsSchema = new mongoose.Schema({
    reporterUserId:String,
    paragraphId:String,
    reportReason: String,
    dateReported:{ type: Date, default: Date.now()}
})

exports.ReportsModel = mongoose.model("reports", reportsSchema);

exports.validReport = (_reqBody) => {
    let joiSchema = joi.object({
        reportReason: joi.String().min(2).max(999).required()
    })
    return joiSchema.validate(_reqBody);
}