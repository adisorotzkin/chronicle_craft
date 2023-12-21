const express= require("express");
const router = express.Router();

router.get("/" , (req,res)=> {
    res.json({message:hello})
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

module.exports = router;