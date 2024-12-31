const express = require('express');
const app = express();

const router = express.Router();




// USERS ROUTE


router.get("/", (req,res)=>{
    res.send("get for users")
})

router.get("/:id", (req,res)=>{
    res.send("get for show users")
})

router.post("/", (req,res)=>{
    res.send("post for users")
})

router.delete("/:id", (req,res)=>{
    res.send("delete for user id")
})
module.exports = router;