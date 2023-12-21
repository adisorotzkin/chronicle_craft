const mongoose = require('mongoose');
const {config} = require("../config/secret");

main().catch(err => console.log(err));

async function main() 
{
  mongoose.set('strictQuery' , false);
  //?authSource=admin&compressors=zlib&retryWrites=true&w=majority&ssl=true
  await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.ceovg2j.mongodb.net/ChronicleCraft`);

  console.log("mongo connect")
}