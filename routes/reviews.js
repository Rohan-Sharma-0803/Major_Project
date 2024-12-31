const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js")
const {listingSchema,reviewSchema} = require("../schema.js");
const Listing = require("../Models/listing.js")
const Review = require("../Models/review.js")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middlewares.js");
const reviewController = require("../controller/reviews.js")

const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);

    // console.log(result);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}






// Reviews
// post route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createRoute));
    
    //  Delete review route
    
    router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview))

    module.exports = router;
