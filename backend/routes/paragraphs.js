const express= require("express");
const {auth} = require("../middlewares/auth");
const {ParagraphsModel,validParagraph} = require("../models/paragraphsModel")
const router = express.Router();


 //Get a paragraph by id.
 router.get("/single/:idParagraph" , async(req,res)=> 
 {
  try
  {
    let idParagraph = req.params.idParagraph
    let data = await ParagraphsModel.findOne({_id:idParagraph})
    res.json(data);
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({msg:"An error occoured. Try again",err})
  }
})
//search a recipe follwing storyId or author ,presenting 10 results per page.
router.get("/search" ,async(req,res) => 
{
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
    try
    {
        let queryS = req.query.s;
        let searchReg = new RegExp(queryS,"i")
        let data = await ParagraphsModel.find({$or:[{storyId:searchReg},{author:searchReg}]})
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


//adding new paragraph with token
router.post("/", auth, async(req,res) => 
{
    let validBody = validParagraph(req.body);
    if(validBody.error)
    {
      return res.status(400).json(validBody.error.details);
    }
    try
    {
      let paragraph = new ParagraphsModel(req.body);
      paragraph.author = req.tokenData._id;
      await paragraph.save();
      res.status(201).json(paragraph);
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({msg:"An error occoured. Try again",err})
    }
})
//edit  paragraph by his user or admin
router.put("/:idEdit", auth, async(req,res) => 
{
    let validBody = validParagraph(req.body);
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
        data = await ParagraphsModel.updateOne({_id:idEdit},req.body)
      }
      else
      {
         data = await ParagraphsModel.updateOne({_id:idEdit,author:req.tokenData._id},req.body)
      }
      res.json(data);
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({msg:"An error occoured. Try again",err})
    }
})
//delete  paragraph by his user or admin
router.delete("/:idDel", auth, async(req,res) => 
{
    try
    {
      let idDel = req.params.idDel;
      let data;
      if(req.tokenData.role == "admin")
      {
        data = await ParagraphsModel.deleteOne({_id:idDel})
      }
      else
      {
        data = await ParagraphsModel.deleteOne({_id:idDel,author:req.tokenData._id})
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