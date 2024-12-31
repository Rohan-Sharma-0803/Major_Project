const express = require("express");
const app = express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js")
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
app.set("view engine", "ejs");

const path = require("path")
app.set("views",path.join(__dirname, "views"));
app.use(flash())

const session = require("express-session");
const { applyTimestamps } = require("../Models/review.js");
const sessionOptions =
    {secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
};
app.use(session(sessionOptions));
app.use((req,res,next)=>{
    res.locals.messages = req.flash("success");
    res.locals.errormsg = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    console.log(req.session.name);
   
    if(name === 'anonymous'){
        req.flash("error", "error while registering")
    }else
    {
        req.flash("success", "user registered")

    }
   
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{

    res.render("random.ejs",{name:req.session.name})
})

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
    
//     res.send(`you sent a request ${req.session.count} times`)
// })

// app.use(cookieParser("secretcode"))

// app.get("/getsignedcookie", (req,res)=>{
//     res.cookie("made-in" , "India" , {signed:true});
//     res.send("signed cookie sent")
// })


// app.get("/verify", (req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified")
// })

// app.get("/getcookies",(req,res)=>{
// res.cookie("great", "namaste");
// res.cookie("madein", "India")

//     res.send("sent you some cookies")
// })

// app.get("/greet", (req,res)=>{
//     let {name = "anonymus"} = req.cookies;

//     res.send(`hi ${name}`)
// })
// app.use("/users",users);
// app.use("/posts", posts)

// app.get("/", (req,res)=>{
//     console.dir(req.cookies);
//     res.send("hi i am root")
// })




app.listen(3000, ()=>{
    console.log("server listening to port")
})