const express= require("express");
const bcrypt = require("bcrypt");
const {auth, authAdmin} = require("../middlewares/auth");
const {UsersModel,validUser,validUserEdit, validLogin,createToken} = require("../models/usersModel")
const router = express.Router();


//Get list of all users - by token admin.
router.get("/usersList" ,authAdmin, async(req,res)=> 
{
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
  
    try
    {
      let data = await UsersModel.find({},{ password: 0 })
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

//Get a user by id.
router.get("/singleId/:idUser" , async(req,res)=> 
{
 try
 {
   let idUser = req.params.idUser
   let data = await UsersModel.findOne({_id:idUser})
   res.json(data);
 }
 catch(err)
 {
   console.log(err)
   res.status(500).json({msg:"err",err})
 }
})
//get a user by author name
router.get("/singleUsername/:username" , async(req,res)=> 
{
 try
 {
   let username = req.params.username
   let data = await UsersModel.findOne({username:username})
   res.json(data);
 }
 catch(err)
 {
   console.log(err)
   res.status(500).json({msg:"err",err})
 }
})
//user's information based on the token they send
router.get("/myProfile",auth,async (req, res) => 
{
  try 
  {
    let info = await UsersModel.findOne({ _id: req.tokenData._id }, { password: 0 });
    res.json(info);
  }
  catch (err) 
  {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})
//adding new user
router.post("/signUp", async(req,res) => {
     console.log("hhhh");
    let validBody = validUser(req.body);
    if(validBody.error)
    {
      return res.status(400).json(validBody.error.details);
    }
    try
    {
      let user = new UsersModel(req.body);
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      user.password = "******";
      res.status(201).json(user);
    }
    catch(err)
    {
      if(err.code == 11000)
      {
        return res.status(500).json({msg:"Email already in system, try logging in",code:11000})
      }
      console.log(err);
      res.status(500).json({msg:"An error occoured. Try again",err})
    }
})
//user login
router.post("/login", async(req,res) => 
{
    let validBody = validLogin(req.body);
    if(validBody.error)
    {
      return res.status(400).json(validBody.error.details);
    }
    try
    {
      let user = await UsersModel.findOne({email:req.body.email})
      if(!user)
      {
        return res.status(401).json({msg:"Password or email are wrong"})
      }
      let authPassword = await bcrypt.compare(req.body.password,user.password);
      if(!authPassword)
      {
        return res.status(401).json({msg:"Password or email are wrong"});
      }
      let token = createToken(user._id, user.role);
      res.json({token, user});
    }
    catch(err)
    {
      console.log(err)
      res.status(500).json({msg:"An error occoured. Try again",err})
    }
})
//edit user by this user or admin
router.put("/:idEdit",auth, async (req, res) => 
{
  let validBody = validUserEdit(req.body);
  if (validBody.error) 
  {
    return res.status(400).json(validBody.error.details);
  }
  try 
  {
    let idEdit = req.params.idEdit;
    let data;
    if (req.tokenData.role === "admin") 
    {
      data = await UsersModel.updateOne({ _id: idEdit }, req.body)
    }
    else if (idEdit === req.tokenData._id) 
    {
      data = await UsersModel.updateOne({ _id: idEdit }, req.body)
    }
    if (!data) 
    {
      return res.status(400).json({ err: "This operation is not enabled or the token is not valid" })
    }
    let user = await UsersModel.findOne({ _id: idEdit });
    res.status(200).json({ msg: data })
  }
  catch (err) 
  {
    console.log(err);
    res.status(400).json({ err })
  }
});
//delit user by this user or admin
router.delete("/:idDel" ,auth,async (req, res) => 
{
  try {
    let idDel = req.params.idDel;
    let data;
    // delete user
    //אפשרות הפיכת יוזר ללא פעיל על ידיד הסופר אדמין
    if (idDel == req.tokenData._id) {
      data = await UsersModel.deleteOne({ _id: idDel });
    }
    // await ToyModel.deleteMany({ user_id: idDel });
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ err })
  }
});

module.exports = router;