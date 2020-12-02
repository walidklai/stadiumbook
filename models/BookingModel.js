const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  stadiumOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  stadium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stadium",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    //required: true,
  },
  stadiumName: {
    type: String,
    required: true,
  },
  cin: {
    type: Number,
    required: true,
  },
  timeSlot: {
    from: {
      type: Number,
      required: true,
    },
    to: {
      type: Number,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
  },
});

module.exports = Booking = mongoose.model("booking", BookingSchema);
