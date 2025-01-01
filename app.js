if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
    
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
const Listing = require("./Models/listing.js");
const ejsMate = require('ejs-mate');
app.engine('ejs',ejsMate);
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const Review = require("./Models/review.js")
const {reviewSchema} = require('./schema.js');

const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js")
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");



// database connection
const dbUrl = process.env.ATLASDB_URL;
main().then((res)=>{
    console.log("connection successful");
}).catch((err) =>{
    console.log(err);

})
async function main(){
    await mongoose.connect(dbUrl);
}

const Store = MongoStore.create({
mongoUrl : dbUrl,
crypto : {
    secret: process.env.SECRET ,
    
}, 
touchAfter : 24*3600

})
Store.on("error", ()=>{
    console.log("ERROR IN MONGO SESSION STORE",err)
})

const sessionOptions = {
    Store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly:true,

    },
};





app.use(session(sessionOptions));
app.use(flash())

app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demouser", async(req,res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username : "abc-student"
//     });
//     let registeredUser = await User.register(fakeUser , "helloworld");
//     res.send(registeredUser);
// })

app.use("/listings", listingsRouter)
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter , listingsRouter);

// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"my new villa",
//         description:"buy the beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India",
//     });

//    await sampleListing.save();
//    console.log("sample was saved")
//     res.send("success");
// });

app.all("*", (req,res,next) =>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let {statusCode= 500,message = "something went wrong"} = err;


    res.status(statusCode).render("error.ejs", {message});
});




app.listen(8080,()=>{
    console.log("server listening to port 8080");
})