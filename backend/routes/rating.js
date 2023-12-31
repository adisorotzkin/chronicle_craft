const express = require("express");
const { auth } = require("../middlewares/auth");
const { RatingsModel, validRating } = require("../models/ratingsModel")
const router = express.Router();


//Get a rating by authorId.
router.get("/:idAuthor" , async(req,res)=> 
{
 try
 {
   let idAuthor = req.params.idAuthor
   let data = await RatingsModel.find({author:idAuthor})
   res.json(data);
 }
 catch(err)
 {
   console.log(err)
   res.status(500).json({msg:"err",err})
 }
})

//adding new rating with token
router.post("/",  async (req, res) => {
  let validBody = validRating(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let rating = new RatingsModel(req.body);
    await rating.save();
    res.status(201).json(rating);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occoured. Try again", err })
  }
})


module.exports = router;