const express = require("express");
const Booking = require("../../models/BookingModel");
const User = require("../../models/UserModel");
const Stadium = require("../../models/StadiumModel");
const auth = require("../../middleware/auth");

const router = express.Router();

//@route /api/booking
//method GET
//public

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.log(err.message);
    res.status(500).json([{ msg: "Server error" }]);
  }
});

//@route /api/booking/mybooking
//method GET
//private

router.get("/mybooking", auth, async (req, res) => {
  try {
    const myBooking = await Booking.findOne({ user: req.user.id });
    if (!myBooking)
      return res.json({ msg: "You dont have any current booking" });
    res.json(myBooking);
  } catch (err) {
    console.log(err.message);
    res.status(500).json([{ msg: "Server error" }]);
  }
});

//@route /api/booking/:id (stadium id)
//method POST
//private

router.post("/:id", auth, async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);
    if (!stadium) return res.status(404).json({ msg: "Stadium not found" });
    const existingBooking =
      /* (await Booking.findOne({ stadium: req.params.id })) || */
      await Booking.findOne({ user: req.user.id });
    if (existingBooking)
      return res.status(400).json([
        {
          msg: "You already have booked for a stadium",
        },
      ]);

    const user = await User.findById(req.user.id);

    const { from, to, day } = req.body;
    const booking = await Booking.find({
      timeSlot: { from, day, to },
    });

    if (booking.length > 0)
      return res.status(400).json([{ msg: "Sorry ,timeSlot already booked" }]);

    const newBooking = new Booking({
      user: req.user.id,
      stadiumOwner: stadium.user,
      stadium: req.params.id,
      name: user.name,
      cin: user.cin,
      stadiumName: stadium.name,
      timeSlot: {
        from,
        to,
        day,
      },
    });
    await newBooking.save();
    res.json(newBooking);
  } catch (err) {
    console.log(err.message);
    if (err.kind !== 200)
      return res.status(404).json([{ msg: "Stadium not found" }]);
  }
});

//@route /api/booking/:id (booking id)
//method DELETE
//private

router.delete("/:id", auth, async (req, res) => {
  try {
    const rmBooking = await Booking.findById(req.params.id);
    if (!rmBooking) return res.status(404).json([{ msg: "Booking not found" }]);

    const tmpDate = new Date();
    const { from, day } = rmBooking.timeSlot;

    if (from - tmpDate.getHours() < 2 && day === tmpDate.getDay())
      return res
        .status(400)
        .json([{ msg: "Too late ,you cannot cancel your booking now" }]);

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: "Booking cancelled", rmBooking });
  } catch (err) {
    console.log(err.message);
    res.status(500).json([{ msg: "Server error" }]);
  }
});

module.exports = router;
