
const express=require("express");
const userRouter=express.Router()

const {BookingModel} = require("../models/Booking.model")
const {UserModel} = require("../models/user.model")
const {ListingModel} = require("../models/Listing.model")

// Getting trip list
userRouter.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params
    const trips = await BookingModel.find({ customerId: userId }).populate("customerId hostId listingId")
    res.status(202).json(trips)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find trips!", error: err.message })
  }
})

// Add listing to wishList
userRouter.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params
    const user = await UserModel.findById(userId)
    const listing = await ListingModel.findById(listingId).populate("creator")

    const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
      await user.save()
      res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList})
    } else {
      user.wishList.push(listing)
      await user.save()
      res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList})
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: err.message })
  }
})

// Getting property list
userRouter.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params
    const properties = await ListingModel.find({ creator: userId }).populate("creator")
    res.status(202).json(properties)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find properties!", error: err.message })
  }
})

// Getting Reservation list
userRouter.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params
    const reservations = await BookingModel.find({ hostId: userId }).populate("customerId hostId listingId")
    res.status(202).json(reservations)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find reservations!", error: err.message })
  }
})


module.exports = {userRouter}

