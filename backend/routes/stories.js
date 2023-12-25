const express = require("express");
const { auth, authAdmin } = require("../middlewares/auth");
const { StoriesModel, validStory } = require("../models/storiesModel")
const router = express.Router();

//Get all stories, presenting 10 results per page.
router.get("/", async (req, res) => {
  let perPage = req.query.perPage || 10;
  let page = req.query.page || 1;
  try {
    let data = await StoriesModel.find({})
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
//Get a story by id.
router.get("/single/:idStory", async (req, res) => {
  try {
    let idStory = req.params.idStory
    let data = await StoriesModel.findOne({ _id: idStory })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})
//search a story follwing title or author, presenting 10 results per page.
router.get("/search", async (req, res) => {
  let perPage = req.query.perPage || 10;
  let page = req.query.page || 1;
  try {
    let queryS = req.query.s;
    let searchReg = new RegExp(queryS, "i")
    let data = await StoriesModel.find({ $or: [{ title: searchReg }, { author: searchReg }] })
      .limit(perPage)
      .skip((page - 1) * perPage)
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})
//search a story follwing genre, presenting 6 results per page.
router.get("/:genre", async (req, res) => {
  let perPage = req.query.perPage || 6;
  let page = req.query.page || 1;
  

  try {
    let genre = req.params.genre;
    let data = await StoriesModel.find({ genre: genre })
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

//search for all author stories, presenting 6 results per page.
router.get("/:author", async (req, res) => {
  let perPage = req.query.perPage || 6;
  let page = req.query.page || 1;
  try {
    let author = req.params.author;
    let data = await StoriesModel.find({ author: author })
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


//adding new story with token
router.post("/", auth, async (req, res) => {
  let validBody = validStory(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let story = new StoriesModel(req.body);
    story.author = req.tokenData._id;
    await story.save();
    res.status(201).json(story);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})

//delete story by his user or admin
router.delete("/:idDel", authAdmin, async (req, res) => {
  try {
    let idDel = req.params.idDel;
    let data;

    data = await StoriesModel.deleteOne({ _id: idDel })

    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})

module.exports = router;