const express= require("express");
const {auth} = require("../middlewares/auth");
const {CharactersModel,validCharacter} = require("../models/charactersModel")
const router = express.Router();

//Get all characters, presenting 10 results per page.
router.get("/",async(req,res) => 
{
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
      try
      {
        let data = await CharactersModel.find({})
        .limit(perPage)
        .skip((page - 1) * perPage)
        .sort({_id:-1})
        res.json(data);
      }
      catch(err)
      {
        console.log(err);
        res.status(500).json({msg:"An error occoured. Try again",err})
      }
 })
 //Get a character by id.
 router.get("/single/:idCharacter" , async(req,res)=> 
 {
  try
  {
    let idCharacter = req.params.idCharacter
    let data = await CharactersModel.findOne({_id:idCharacter})
    res.json(data);
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({msg:"An error occoured. Try again",err})
  }
})
//search a character follwing characterName or storyId ,presenting 10 results per page.
router.get("/search" ,async(req,res) => 
{
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
    try
    {
        let queryS = req.query.s;
        let searchReg = new RegExp(queryS,"i")
        let data = await CharactersModel.find({$or:[{characterName:searchReg},{storyId:searchReg}]})
        .limit(perPage)
        .skip((page - 1) * perPage)
        res.json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({msg:"An error occoured. Try again",err})
    }
})

//search for story's characters, presenting 5 results per page.
router.get("/storyId/:storyId", async (req, res) => {
  let perPage = req.query.perPage || 5;
  let page = req.query.page || 1;


  try {
    let storyId = req.params.storyId;
    let data = await CharactersModel.find({ storyId: storyId })
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

//adding new character with token
router.post("/", auth, async(req,res) => 
{
    let validBody = validCharacter(req.body);
    if(validBody.error)
    {
      return res.status(400).json(validBody.error.details);
    }
    try
    {
      let character = new CharactersModel(req.body);
      character.author = req.tokenData._id;
      await character.save();
      res.status(201).json(character);
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({msg:"An error occoured. Try again",err})
    }
})
//edit character by his user or admin
router.put("/:idEdit", auth, async(req,res) => 
{
    let validBody = validCharacter(req.body);
    if(validBody.error)
    {
      return res.status(400).json(validBody.error.details);
    }
    try
    {
      let idEdit = req.params.idEdit;
      let data;
      if(req.tokenData.role == "admin")
      {
        data = await CharactersModel.updateOne({_id:idEdit},req.body)
      }
      else
      {
         data = await CharactersModel.updateOne({_id:idEdit,author:req.tokenData._id},req.body)
      }
      res.json(data);
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({msg:"An error occoured. Try again",err})
    }
})
//delete character by his user or admin
router.delete("/:idDel", auth, async(req,res) => 
{
    try
    {
      let idDel = req.params.idDel;
      let data;
      if(req.tokenData.role == "admin")
      {
        data = await CharactersModel.deleteOne({_id:idDel})
      }
      else
      {
        data = await CharactersModel.deleteOne({_id:idDel,author:req.tokenData._id})
      }
      res.json(data);
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({msg:"An error occoured. Try again",err})
    }
})

 module.exports = router;