const mongoose = require('mongoose');
const {config} = require("../config/secret");

main().catch(err => console.log(err));

async function main() 
{
  mongoose.set('strictQuery' , false);
  console.log(config.userDb);
  console.log(config.passDb);
  
  await mongoose.connect("mongodb+srv://Chana_Kahana:Chana8505@cluster0.ceovg2j.mongodb.net/ChronicleCraft");

  console.log("mongo connect")
}