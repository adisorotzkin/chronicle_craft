const express = require("express");
const { auth, authAdmin } = require("../../middlewares/auth");
const { ReportsModel, validReport } = require("../../models/reportsModel")
const router = express.Router();

router.get("/", authAdmin, async (req, res) => {
    let perPage = req.query.perPage || 30;
    let page = req.query.page || 1;

    try {
        let data = await ReportsModel.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ _id: -1 })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "An error occoured. Try again", err })
    }
})

module.exports = router;