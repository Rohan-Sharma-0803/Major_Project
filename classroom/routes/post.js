const express = require('express');
const app = express();
const router = express.Router();

// POST ROUTE
router.get("/", (req,res)=>{
    res.send("hi i am root")
})

router.get("/", (req,res)=>{
    res.send("get for posts")
})

router.get("/:id", (req,res)=>{
    res.send("get for show posts")
})

router.post("/", (req,res)=>{
    res.send("post for posts")
})

app.delete("/:id", (req,res)=>{
    res.send("delete for post id")
})

module.exports = router;