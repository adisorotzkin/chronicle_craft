const express = require("express");
const { auth } = require("../middlewares/auth");
const { CommentsModel, validComment } = require("../models/commentsModel")
const router = express.Router();


//Get a comment by id.
// router.get("/single/:idComment", async (req, res) => {
//   try {
//     let idComment = req.params.idComment
//     let data = await CommentsModel.findOne({ _id: idComment })
//     res.json(data);
//   }
//   catch (err) {
//     console.log(err)
//     res.status(500).json({ msg: "An error occoured. Try again", err })
//   }
// })

//search for all paragrafhs's comments, presenting 6 results per page.
router.get("/:paragraphId", async (req, res) => {
  let perPage = req.query.perPage || 6;
  let page = req.query.page || 1;
  let paragraphId = req.params.paragraphId;
  let data;

  try {
    dete = await CommentsModel.find({ paragraphId: paragraphId })
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

//search for user's comments, presenting 6 results per page.
router.get("/:userId", async (req, res) => {
  let perPage = req.query.perPage || 6;
  let page = req.query.page || 1;
  let userId = req.params.userId;
  let data;

  try {
    dete = await CommentsModel.find({ userId: userId })
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

//adding new comment with token
router.post("/", auth, async (req, res) => {
  let validBody = validComment(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let comment = new CommentsModel(req.body);
    comment.userId = req.tokenData._id;
    await comment.save();
    res.status(201).json(comment);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})
//edit comment by his user or admin
router.put("/:idEdit", auth, async (req, res) => {
  let validBody = validComment(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let idEdit = req.params.idEdit;
    let data;
    if (req.tokenData.role == "admin") {
      data = await CommentsModel.updateOne({ _id: idEdit }, req.body)
    }
    else {
      data = await CommentsModel.updateOne({ _id: idEdit, userId: req.tokenData._id }, req.body)
    }
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})
//delete comment by his user or admin
router.delete("/:idDel", auth, async (req, res) => {
  try {
    let idDel = req.params.idDel;
    let data;
    if (req.tokenData.role == "admin") {
      data = await CommentsModel.deleteOne({ _id: idDel })
    }
    else {
      data = await CommentsModel.deleteOne({ _id: idDel, userId: req.tokenData._id })
    }
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})

module.exports = router;