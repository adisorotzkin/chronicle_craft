const express = require("express");
const { auth } = require("../middlewares/auth");
const { RatingsModel, validRating } = require("../models/ratingsModel")
const router = express.Router();

//Get all ratings, presenting 10 results per page.
router.get("/", async (req, res) => {
  let perPage = req.query.perPage || 10;
  let page = req.query.page || 1;
  try {
    let data = await RatingsModel.find({})
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

//search a rating follwing authorId ,presenting 10 results per page.
router.get("/search", async (req, res) => {
  let perPage = req.query.perPage || 10;
  let page = req.query.page || 1;
  try {
    let queryS = req.query.s;
    let searchReg = new RegExp(queryS, "i")
    let data = await RatingsModel.find({ authorId: searchReg })
      .limit(perPage)
      .skip((page - 1) * perPage)
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})

//adding new recipe with token
router.post("/", auth, async (req, res) => {
  let validBody = validRating(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let rating = new RatingsModel(req.body);
    rating.userId = req.tokenData._id;
    await rating.save();
    res.status(201).json(rating);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})
//edit recipe by his user or admin
router.put("/:idEdit", auth, async (req, res) => {
  let validBody = validRating(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let idEdit = req.params.idEdit;
    let data;
    if (req.tokenData.role == "admin") {
      data = await RatingsModel.updateOne({ _id: idEdit }, req.body)
    }
    else {
      data = await RatingsModel.updateOne({ _id: idEdit, userId: req.tokenData._id }, req.body)
    }
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})
//delete rating by his user or admin
router.delete("/:idDel", auth, async (req, res) => {
  try {
    let idDel = req.params.idDel;
    let data;
    if (req.tokenData.role == "admin") {
      data = await RatingsModel.deleteOne({ _id: idDel })
    }
    else {
      data = await RatingsModel.deleteOne({ _id: idDel, userId: req.tokenData._id })
    }
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})

module.exports = router;