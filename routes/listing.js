const express = require('express');
const router = express.Router();
// const {filterByCategory} = require('../controller/listings.js');
const wrapAsync = require("../utils/wrapAsync.js")


const {listingSchema , reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../Models/listing.js");
const {isLoggedIn} = require("../middlewares.js")
const {isOwner,validateListing} = require("../middlewares.js")
const listingController = require("../controller/listings.js")
const multer   = require('multer')
const { storage} = require("../cloudConfig.js")
const upload = multer({storage})




// Index route

router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,

  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing));

// new and create

router.get("/new",isLoggedIn, listingController.renderNewForm);


  // SHOW AND UPDATE and delete
  router.route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing ))
    .delete(isLoggedIn,isOwner,
    wrapAsync(listingController.destroyListing))




// edit route
router.get("/:id/edit",
  isLoggedIn,isOwner,
  wrapAsync(listingController.renderEditFrom))

// Show route
//update route
// Delete route

router.get('/listings/category/:category' , listingController.filterByCategory)

module.exports = router;